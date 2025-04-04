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

            // Título
            pdf.setFontSize(18);
            pdf.setTextColor(0, 100, 0); // Verde escuro
            pdf.text("MMB Transportes LTDA", 20, 20);

            pdf.setFontSize(14);
            pdf.setTextColor(0, 0, 0);
            pdf.text("Relatório de Cotação de Frete", 20, 30);

            // Dados do relatório com cores personalizadas
            const dados = [
                ["Origem", origem],
                ["Destino", destino],
                ["Distância", `${distancia} km`],
                ["Eixos", eixos],
                ["Pedágio", `R$ ${formatarValor(pedagio)}`],
                ["ICMS", `${icms}%`],
                ["Taxa Federal", `${taxaFederal}%`],
                ["Custo Combustível", `R$ ${formatarValor(custoCombustivel)}`],
                ["Valor Base do Frete", `R$ ${formatarValor(valorFrete)}`],
                ["Custo Total (com impostos)", `R$ ${formatarValor(custoTotalComImpostos)}`],
                ["Lucro Líquido", `R$ ${formatarValor(lucroLiquido)}`]
            ];

            const bodyStyled = dados.map(([descricao, valor]) => {
                let corTexto = [0, 0, 0];

                if (descricao.includes("Pedágio") || descricao.includes("Custo") || descricao.includes("ICMS") || descricao.includes("Taxa")) {
                    corTexto = [204, 0, 0]; // vermelho para despesas
                }
                if (descricao.includes("Valor Base")) {
                    corTexto = [0, 102, 204]; // azul
                }
                if (descricao.includes("Lucro")) {
                    corTexto = [0, 153, 0]; // verde
                }

                return [
                    { content: descricao, styles: { textColor: [0, 0, 0] } },
                    { content: valor, styles: { textColor: corTexto } }
                ];
            });

            pdf.autoTable({
                startY: 40,
                head: [["Descrição", "Valor"]],
                body: bodyStyled,
                theme: 'grid',
                headStyles: {
                    fillColor: [0, 102, 204],
                    textColor: 255,
                    fontSize: 12,
                    fontStyle: 'bold'
                },
                bodyStyles: {
                    fontSize: 12
                },
                columnStyles: {
                    0: { cellWidth: 90 },
                    1: { cellWidth: 90 }
                }
            });

            // Rodapé com data e marca
            const dataAtual = new Date().toLocaleDateString();
            pdf.setFontSize(10);
            pdf.setTextColor(150);
            pdf.text(`Data: ${dataAtual} | Relatório gerado automaticamente pela MMB Transportes`, 20, pdf.internal.pageSize.height - 10);

            // Salvar PDF
            pdf.save(`relatorio_frete_${origem}_${destino}.pdf`);
        });
    }, 1000);
};
