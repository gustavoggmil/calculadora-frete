document.getElementById('gerar-pdf').addEventListener('click', function() {
    // Verificar se a mensagem de 'organizando PDF' existe
    const mensagemProcessando = document.getElementById('mensagem-processando');
    if (mensagemProcessando) {
        mensagemProcessando.innerText = "Organizando PDF...";
        mensagemProcessando.style.display = 'block';  // Exibir a mensagem
    }

    // Verificar se window.calculoFreteData existe e contém os dados necessários
    if (window.calculoFreteData) {
        const { origem, destino, distancia, eixos, pedagio, icms, taxaFederal, custoCombustivel, valorFrete, custoTotalComImpostos, lucroLiquido } = window.calculoFreteData;

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
            ["Pedágio", pedagio ? `R$ ${pedagio.toFixed(2)}` : 'R$ 0,00'],
            ["ICMS", icms ? `${icms}%` : '0%'],
            ["Taxa Federal", taxaFederal ? `${taxaFederal}%` : '0%'],
            ["Custo Combustível", custoCombustivel ? `R$ ${custoCombustivel.toFixed(2)}` : 'R$ 0,00'],
            ["Valor Base do Frete", valorFrete ? `R$ ${valorFrete.toFixed(2)}` : 'R$ 0,00'],
            ["Custo Total (com impostos)", custoTotalComImpostos ? `R$ ${custoTotalComImpostos.toFixed(2)}` : 'R$ 0,00'],
            ["Lucro Líquido", lucroLiquido ? `R$ ${lucroLiquido.toFixed(2)}` : 'R$ 0,00']
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

        // Esconder a mensagem de 'organizando PDF' após a geração do PDF
        if (mensagemProcessando) {
            mensagemProcessando.style.display = 'none';  // Esconder a mensagem
        }
    } else {
        console.error("Dados de frete não encontrados!");
        if (mensagemProcessando) {
            mensagemProcessando.innerText = "Erro ao organizar o PDF. Tente novamente.";
        }
    }
});
