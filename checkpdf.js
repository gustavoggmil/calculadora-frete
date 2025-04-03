window.onload = function() {
    // Verifica se a biblioteca jsPDF está carregada corretamente
    if (typeof window.jspdf === 'undefined') {
        alert('Erro: jsPDF não está carregado!');
        return;
    }

    // Verifica se os dados de cálculo estão disponíveis
    if (typeof window.calculoFreteData === 'undefined') {
        alert('Erro: Dados de cálculo não encontrados!');
        return;
    }

    document.getElementById("gerar-pdf").addEventListener("click", function() {
        // Pegando os dados do cálculo realizado
        const { origem, destino, distancia, eixos, pedagio, icms, taxaFederal, custoCombustivel, valorFrete, custoTotalComImpostos, lucroLiquido } = window.calculoFreteData;

        // Garantir que jsPDF seja carregado da forma correta
        const { jsPDF } = window.jspdf;
        
        // Criando o PDF
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
            ["Pedágio", `R$ ${pedagio ? pedagio.toFixed(2) : '0.00'}`], // Verificar se pedagio está definido
            ["ICMS", `${icms}%`],
            ["Taxa Federal", `${taxaFederal}%`],
            ["Custo Combustível", `R$ ${custoCombustivel ? custoCombustivel.toFixed(2) : '0.00'}`],
            ["Valor Base do Frete", `R$ ${valorFrete ? valorFrete.toFixed(2) : '0.00'}`],
            ["Custo Total (com impostos)", `R$ ${custoTotalComImpostos ? custoTotalComImpostos.toFixed(2) : '0.00'}`],
            ["Lucro Líquido", `R$ ${lucroLiquido ? lucroLiquido.toFixed(2) : '0.00'}`]
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
