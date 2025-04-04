window.onload = function () {
    // Espera 1 segundo antes de continuar, para garantir que as bibliotecas estejam carregadas
    setTimeout(function () {
        // Verificar se jsPDF está carregado corretamente
        if (typeof window.jspdf === 'undefined') {
            console.error("jsPDF não está carregado corretamente.");
            return;
        }

        const { jsPDF } = window.jspdf;

        document.getElementById("gerar-pdf").addEventListener("click", function () {
            // Verifica se os dados estão disponíveis
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

            // Função para garantir que os valores sejam válidos
            function formatarValor(valor) {
                return (valor && !isNaN(valor)) ? parseFloat(valor).toFixed(2) : "0.00";
            }

            const pdf = new jsPDF();

            // Checa se autoTable está disponível
            if (typeof pdf.autoTable !== 'function') {
                console.error("autoTable não está disponível no jsPDF.");
                return;
            }

            // Título
            pdf.setFontSize(16);
            pdf.setTextColor(0, 102, 204);
            pdf.text("MMB Transportes LTDA", 20, 20);
            pdf.setFontSize(14);
            pdf.text("Relatório de Cotação de Frete", 20, 30);

            // Conteúdo
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);

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
                }
            });

            // Salvar PDF
            pdf.save(`relatorio_frete_${origem}_${destino}.pdf`);
        });
    }, 1000);
};
