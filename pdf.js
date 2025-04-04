window.onload = function () {
    setTimeout(function () {
        if (typeof window.jspdf === 'undefined') {
            console.error("jsPDF não está carregado corretamente.");
            return;
        }

        const { jsPDF } = window.jspdf;

        document.getElementById("gerar-pdf").addEventListener("click", function () {
            if (!window.calculoFreteData) {
                console.error("Os dados de cálculo do frete não foram encontrados.");
                return;
            }

            const {
                origem,
                destino,
                distancia,
                eixos,
                pedagio,
                icms,
                taxaFederal,
                custoCombustivel,
                valorFrete,
                custoTotalComImpostos,
                lucroLiquido
            } = window.calculoFreteData;

            function formatarValor(valor) {
                return (valor && !isNaN(valor)) ? parseFloat(valor).toFixed(2) : "0.00";
            }

            const pdf = new jsPDF();

            if (typeof pdf.autoTable !== 'function') {
                console.error("autoTable não está disponível no jsPDF.");
                return;
            }

            // Adiciona o logotipo
            const img = new Image();
            img.src = 'logopdf.png';
            img.onload = function () {
                pdf.addImage(img, 'PNG', 150, 10, 40, 20);

                // Título
                pdf.setFontSize(16);
                pdf.setTextColor(0, 100, 0);
                pdf.text("MMB Transportes LTDA", 20, 20);
                pdf.setFontSize(14);
                pdf.setTextColor(0, 0, 0);
                pdf.text("Relatório de Cotação de Frete", 20, 30);

                // Tabela de dados
                const dados = [
                    ["Origem", origem],
                    ["Destino", destino],
                    ["Distância", `${distancia} km`],
                    ["Eixos", eixos],
                    ["Pedágio", `R$ ${formatarValor(pedagio)}`],
                    ["ICMS", `${icms}%`],
                    ["Taxa Federal", `${taxaFederal}%`],
                    ["Custo Combustível", `R$ ${formatarValor(custoCombustivel)}`],
                    ["Valor Bruto do Frete", `R$ ${formatarValor(valorFrete)}`],
                    ["Custo Total (com impostos)", `R$ ${formatarValor(custoTotalComImpostos)}`],
                    ["Lucro Líquido", `R$ ${formatarValor(lucroLiquido)}`]
                ];

                pdf.autoTable({
                    startY: 40,
                    head: [['Descrição', 'Valor']],
                    body: dados,
                    theme: 'grid',
                    headStyles: {
                        fillColor: [0, 102, 204],
                        textColor: 255,
                        fontSize: 12,
                        fontStyle: 'bold'
                    },
                    bodyStyles: {
                        fontSize: 12,
                        textColor: [0, 0, 0]
                    },
                    margin: { top: 10 },
                    columnStyles: {
                        0: { cellWidth: 90 },
                        1: { cellWidth: 90 }
                    },
                    didParseCell: function (data) {
                        const linha = data.row.index;
                        const coluna = data.column.index;
                        const desc = data.cell.raw;

                        if (coluna === 0 && desc === "Lucro Líquido") {
                            data.cell.styles.textColor = [0, 128, 0];
                        } else if (coluna === 0 && desc === "Valor Bruto do Frete") {
                            data.cell.styles.textColor = [0, 0, 255];
                        } else if (coluna === 0 && (
                            desc === "Pedágio" ||
                            desc === "ICMS" ||
                            desc === "Taxa Federal" ||
                            desc === "Custo Combustível" ||
                            desc === "Custo Total (com impostos)"
                        )) {
                            data.cell.styles.textColor = [255, 0, 0];
                        }
                    }
                });

                // Gráfico de pizza com Chart.js no canvas embutido
                const canvas = document.createElement('canvas');
                canvas.width = 300;
                canvas.height = 300;
                const ctx = canvas.getContext('2d');
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Despesas', 'Lucro Líquido'],
                        datasets: [{
                            data: [custoTotalComImpostos, lucroLiquido],
                            backgroundColor: ['#FF4C4C', '#4CAF50']
                        }]
                    },
                    options: {
                        onClick: (e, elements) => {
                            if (elements.length > 0) {
                                const index = elements[0].index;
                                if (index === 0) {
                                    alert(`Despesas:\n- Pedágio: R$ ${formatarValor(pedagio)}\n- ICMS: ${icms}%\n- Taxa Federal: ${taxaFederal}%\n- Combustível: R$ ${formatarValor(custoCombustivel)}`);
                                } else {
                                    alert(`Lucro líquido: R$ ${formatarValor(lucroLiquido)}`);
                                }
                            }
                        },
                        responsive: false,
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                });

                // Adiciona gráfico ao PDF
                setTimeout(() => {
                    const imgData = canvas.toDataURL('image/png');
                    pdf.addImage(imgData, 'PNG', 30, pdf.lastAutoTable.finalY + 10, 140, 100);

                    // Rodapé
                    const dataHoje = new Date().toLocaleDateString();
                    pdf.setFontSize(10);
                    pdf.setTextColor(150);
                    pdf.text(`Gerado em: ${dataHoje}`, 20, 285);
                    pdf.text("MMB Transportes LTDA", 150, 285);

                    pdf.save(`relatorio_frete_${origem}_${destino}.pdf`);
                }, 1000);
            };
        });
    }, 1000);
};
