window.onload = function() {
    document.getElementById("gerar-pdf").addEventListener("click", function() {
        // Verificar se jsPDF e jsPDF AutoTable estão carregados corretamente
        if (typeof window.jspdf === 'undefined' || typeof window.jspdf.autoTable === 'undefined') {
            console.error("jsPDF ou jsPDF AutoTable não estão carregados corretamente.");
            return;
        }

        // Pegando os dados do cálculo realizado
        const { origem, destino, distancia, eixos, pedagio, icms, taxaFederal, custoCombustivel, valorFrete, custoTotalComImpostos, lucroLiquido } = window.calculoFreteData;

        // Função para garantir que os valores sejam válidos
        function formatarValor(valor) {
            return (valor && !isNaN(valor)) ? valor.toFixed(2) : "0.00"; // Retorna "0.00" se o valor não for válido
        }

        // Criando o PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        pdf.setFontSize(16);
        pdf.setTextColor(0, 102, 204); // Cor azul para o título
        pdf.text("MMB Transportes LTDA", 20, 20);
        pdf.setFontSize(14);
        pdf.text("Relatório de Cotação de Frete", 20, 30);

        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0); // Resetar cor para o conteúdo

        // Definir a tabela com dados do relatório
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

        // Configuração da tabela
        pdf.autoTable({
            startY: 40,
            head: [['Descrição', 'Valor']],
            body: dados,
            theme: 'grid',
            headStyles: {
                fillColor: [0, 102, 204], // Azul para o cabeçalho
                textColor: 255,
                fontSize: 12,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 12,
                textColor: [0, 0, 0], // Texto preto
            },
            margin: { top: 10 },
            columnStyles: {
                0: { cellWidth: 90 },
                1: { cellWidth: 90 }
            }
        });

        // Salvar o PDF com o nome do arquivo
        pdf.save(`relatorio_frete_${origem}_${destino}.pdf`);
    });
};
