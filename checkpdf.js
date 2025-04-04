window.onload = function () {
    // Verifica se a biblioteca jsPDF está carregada corretamente
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.autoTable === 'undefined') {
        alert('Erro: jsPDF ou jsPDF AutoTable não está carregado!');
        return;
    }

    // Verifica se os dados de cálculo estão disponíveis
    if (typeof window.calculoFreteData === 'undefined') {
        alert('Erro: Dados de cálculo não encontrados!');
        return;
    }

    document.getElementById("gerar-pdf").addEventListener("click", function () {
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

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        // Cabeçalho
        pdf.setFontSize(16);
        pdf.setTextColor(0, 102, 204);
        pdf.text("MMB Transportes LTDA", 20, 20);

        pdf.setFontSize(14);
        pdf.text("Relatório de Cotação de Frete", 20, 30);

        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`Data: ${new Date().toLocaleDateString()}`, 150, 20);

        // Tabela com dados operacionais e despesas
        const dados = [
            ["Origem", origem],
            ["Destino", destino],
            ["Distância", `${distancia} km`],
            ["Eixos", eixos],
            ["Pedágio", `R$ ${pedagio?.toFixed(2) || '0.00'}`],
            ["ICMS", `${icms}%`],
            ["Taxa Federal", `${taxaFederal}%`],
            ["Custo Combustível", `R$ ${custoCombustivel?.toFixed(2) || '0.00'}`]
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
                textColor: [255, 0, 0] // despesas em vermelho
            },
            columnStyles: {
                0: { cellWidth: 90 },
                1: { cellWidth: 90 }
            }
        });

        // Tabela com valores principais
        const totais = [
            ["Valor Bruto do Frete", `R$ ${valorFrete?.toFixed(2) || '0.00'}`],
            ["Custo Total com Impostos", `R$ ${custoTotalComImpostos?.toFixed(2) || '0.00'}`],
            ["Lucro Líquido", `R$ ${lucroLiquido?.toFixed(2) || '0.00'}`]
        ];

        pdf.autoTable({
            startY: pdf.lastAutoTable.finalY + 10,
            head: [['Resumo Financeiro', 'Valor']],
            body: totais,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 102, 204],
                textColor: 255,
                fontSize: 12,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 12,
                textColor: (data) => {
                    if (data.row.index === 0) return [0, 102, 204]; // Azul para frete bruto
                    if (data.row.index === 2) return [255, 0, 0]; // Vermelho para lucro líquido
                    return [0, 0, 0]; // Preto para o restante
                }
            },
            columnStyles: {
                0: { cellWidth: 90 },
                1: { cellWidth: 90 }
            }
        });

        // Rodapé
        pdf.setFontSize(10);
        pdf.setTextColor(150);
        pdf.text("Documento gerado automaticamente pelo sistema da MMB Transportes", 20, 285);

        // Salvar o PDF
        pdf.save(`relatorio_frete_${origem}_${destino}.pdf`);
    });
};
