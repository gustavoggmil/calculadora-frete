document.getElementById("gerar-pdf").addEventListener("click", function() {
    // Pegando os dados do relatório
    const origem = document.getElementById("origem").value;
    const destino = document.getElementById("destino").value;
    const distancia = parseFloat(document.getElementById("distancia").value);
    const eixos = parseInt(document.getElementById("eixos").value);
    const pedagio = parseFloat(document.getElementById("pedagio").value);
    const icms = parseFloat(document.getElementById("icms").value);
    const taxaFederal = parseFloat(document.getElementById("taxa-federal").value);
    const kmPorLitro = parseFloat(document.getElementById("km-por-litro").value);
    const precoCombustivel = parseFloat(document.getElementById("preco-combustivel").value);
    const pesoCarga = parseFloat(document.getElementById("peso-carga").value);
    const custosAdicionais = parseFloat(document.getElementById("custos-adicionais").value);
    const lucro = parseFloat(document.getElementById("lucro").value);

    // Recalcular para gerar o PDF com base nos valores informados
    const consumoCombustivel = distancia / kmPorLitro;
    const custoCombustivel = consumoCombustivel * precoCombustivel;

    const taxaPeso = pesoCarga * 0.05;
    const custoTotal = (
        350.00 + 1500.00 + 260.00 + 60.00 + custoCombustivel + pedagio + custosAdicionais + taxaPeso
    );

    const valorICMS = custoTotal * (icms / 100);
    const valorTaxaFederal = custoTotal * (taxaFederal / 100);
    const custoTotalComImpostos = custoTotal + valorICMS + valorTaxaFederal;

    const valorFrete = custoTotalComImpostos * (1 + lucro / 100);
    const lucroLiquido = valorFrete - custoTotalComImpostos;

    // Gerando o PDF com os dados do frete
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
        ["Pedágio", `R$ ${pedagio.toFixed(2)}`],
        ["ICMS", `${icms}%`],
        ["Taxa Federal", `${taxaFederal}%`],
        ["Consumo de Combustível", `${consumoCombustivel.toFixed(2)} L`],
        ["Preço do Combustível", `R$ ${precoCombustivel.toFixed(2)}`],
        ["Peso da Carga", `${pesoCarga} kg`],
        ["Custos Adicionais", `R$ ${custosAdicionais.toFixed(2)}`],
        ["Margem de Lucro", `${lucro}%`],
        ["Valor do Frete", `R$ ${valorFrete.toFixed(2)}`],
        ["Custo Total (com impostos)", `R$ ${custoTotalComImpostos.toFixed(2)}`],
        ["Lucro Líquido", `R$ ${lucroLiquido.toFixed(2)}`]
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
