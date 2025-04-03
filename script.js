const { jsPDF } = window.jspdf;

document.getElementById("form-frete").addEventListener("submit", function(event) {
    event.preventDefault();

    // Coleta os valores dos inputs
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

    // Chama a função de cálculo
    const resultado = calcularFrete(distancia, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro);

    // Gera o PDF
    gerarRelatorio(origem, destino, distancia, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro, resultado);
});

function calcularFrete(km, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro) {
    const seguroCarga = 350.00;
    const desembarque = 1500.00;
    const pancardValePedagio = 260.00;
    const buonnyCadastroMotorista = 60.00;

    const consumoCombustivel = km / kmPorLitro;
    const custoCombustivel = consumoCombustivel * precoCombustivel;

    const taxaPeso = pesoCarga * 0.05;

    const custoTotal = seguroCarga + desembarque + pancardValePedagio + buonnyCadastroMotorista + custoCombustivel + pedagio + custosAdicionais + taxaPeso;

    const valorICMS = custoTotal * (icms / 100);
    const valorTaxaFederal = custoTotal * (taxaFederal / 100);
    const custoTotalComImpostos = custoTotal + valorICMS + valorTaxaFederal;

    const valorFrete = custoTotalComImpostos * (1 + lucro / 100);
    const lucroLiquido = valorFrete - custoTotalComImpostos;

    return { valorFrete, custoTotalComImpostos, custoCombustivel, consumoCombustivel, lucroLiquido };
}

function gerarRelatorio(origem, destino, km, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro, resultado) {
    const { valorFrete, custoTotalComImpostos, custoCombustivel, consumoCombustivel, lucroLiquido } = resultado;

    const doc = new jsPDF();
    doc.setFont("Arial", "B", 16);
    doc.text("MMB Transportes LTDA", 105, 20, null, null, "center");
    doc.text("RELATÓRIO DE COTAÇÃO DE FRETE", 105, 30, null, null, "center");

    const tabelaDados = [
        ["Origem", origem],
        ["Destino", destino],
        ["Distância (km)", km],
        ["Número de Eixos", eixos],
        ["Pedágio (R$)", pedagio],
        ["ICMS (%)", icms],
        ["Taxa Federal (%)", taxaFederal],
        ["Consumo Médio (km/L)", kmPorLitro],
        ["Preço do Combustível (R$)", precoCombustivel],
        ["Peso da Carga (kg)", pesoCarga],
        ["Custos Adicionais (R$)", custosAdicionais],
        ["Margem de Lucro (%)", lucro],
        ["Consumo de Combustível (L)", consumoCombustivel],
        ["Custo Total (R$)", custoTotalComImpostos],
        ["Valor do Frete (R$)", valorFrete],
        ["Lucro Líquido (R$)", lucroLiquido]
    ];

    doc.autoTable({
        head: [["Descrição", "Valor"]],
        body: tabelaDados,
        startY: 40
    });

    doc.save(`cotacao_frete_${origem}_${destino}.pdf`);
}
