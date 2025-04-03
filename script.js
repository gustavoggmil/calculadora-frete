document.getElementById("freteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let origem = document.getElementById("origem").value;
    let destino = document.getElementById("destino").value;
    let km = parseFloat(document.getElementById("distancia").value);
    let eixos = parseInt(document.getElementById("eixos").value);
    let pedagio = parseFloat(document.getElementById("pedagio").value);
    let icms = parseFloat(document.getElementById("icms").value);
    let taxaFederal = parseFloat(document.getElementById("taxaFederal").value);
    let kmPorLitro = parseFloat(document.getElementById("kmPorLitro").value);
    let precoCombustivel = parseFloat(document.getElementById("precoCombustivel").value);
    let pesoCarga = parseFloat(document.getElementById("pesoCarga").value);
    let custosAdicionais = parseFloat(document.getElementById("custosAdicionais").value);
    let lucro = parseFloat(document.getElementById("lucro").value);

    let seguroCarga = 350.00;
    let desembarque = 1500.00;
    let pancardValePedagio = 260.00;
    let buonnyCadastroMotorista = 60.00;

    let consumoCombustivel = km / kmPorLitro;
    let custoCombustivel = consumoCombustivel * precoCombustivel;
    let taxaPeso = pesoCarga * 0.05;

    let custoTotal = seguroCarga + desembarque + pancardValePedagio + buonnyCadastroMotorista +
                     custoCombustivel + pedagio + custosAdicionais + taxaPeso;

    let valorICMS = custoTotal * (icms / 100);
    let valorTaxaFederal = custoTotal * (taxaFederal / 100);
    let custoTotalComImpostos = custoTotal + valorICMS + valorTaxaFederal;

    let valorFrete = custoTotalComImpostos * (1 + lucro / 100);
    let lucroLiquido = valorFrete - custoTotalComImpostos;

    document.getElementById("resultado").innerHTML = `
        <p><strong>Valor do Frete:</strong> R$ ${valorFrete.toFixed(2)}</p>
        <p><strong>Custo Total com Impostos:</strong> R$ ${custoTotalComImpostos.toFixed(2)}</p>
        <p><strong>Custo com Combustível:</strong> R$ ${custoCombustivel.toFixed(2)}</p>
        <p><strong>Consumo de Combustível:</strong> ${consumoCombustivel.toFixed(2)} Litros</p>
        <p><strong>Lucro Líquido:</strong> R$ ${lucroLiquido.toFixed(2)}</p>
    `;

    document.getElementById("gerarPdf").style.display = "block";

    document.getElementById("gerarPdf").onclick = function() {
        gerarPDF(origem, destino, valorFrete, custoTotalComImpostos, custoCombustivel, consumoCombustivel, lucroLiquido);
    };
});

function gerarPDF(origem, destino, valorFrete, custoTotal, custoCombustivel, consumoCombustivel, lucroLiquido) {
    let doc = new jsPDF();
    doc.text("MMB Transportes - Relatório de Frete", 10, 10);
    doc.text(`Origem: ${origem}`, 10, 20);
    doc.text(`Destino: ${destino}`, 10, 30);
    doc.text(`Valor do Frete: R$ ${valorFrete.toFixed(2)}`, 10, 40);
    doc.text(`Custo Total: R$ ${custoTotal.toFixed(2)}`, 10, 50);
    doc.text(`Combustível: R$ ${custoCombustivel.toFixed(2)}`, 10, 60);
    doc.text(`Consumo: ${consumoCombustivel.toFixed(2)}L`, 10, 70);
    doc.text(`Lucro: R$ ${lucroLiquido.toFixed(2)}`, 10, 80);
    doc.save("frete.pdf");
}
