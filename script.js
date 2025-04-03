document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calcular-frete").addEventListener("click", calcularFrete);
});

function calcularFrete() {
    let origem = document.getElementById("origem").value;
    let destino = document.getElementById("destino").value;
    let distancia = parseFloat(document.getElementById("distancia").value);
    let eixos = parseInt(document.getElementById("eixos").value);
    let pedagio = parseFloat(document.getElementById("pedagio").value);
    let icms = parseFloat(document.getElementById("icms").value) / 100;
    let taxaFederal = parseFloat(document.getElementById("taxa-federal").value) / 100;
    let kmPorLitro = parseFloat(document.getElementById("km-por-litro").value);
    let precoCombustivel = parseFloat(document.getElementById("preco-combustivel").value);
    let pesoCarga = parseFloat(document.getElementById("peso-carga").value);
    let custosAdicionais = parseFloat(document.getElementById("custos-adicionais").value);
    let lucro = parseFloat(document.getElementById("lucro").value) / 100;

    let seguroCarga = 350.00;
    let desembarque = 1500.00;
    let pancardValePedagio = 260.00;
    let buonnyCadastroMotorista = 60.00;

    let consumoCombustivel = distancia / kmPorLitro;
    let custoCombustivel = consumoCombustivel * precoCombustivel;
    let taxaPeso = pesoCarga * 0.05;

    let custoTotal = seguroCarga + desembarque + pancardValePedagio + buonnyCadastroMotorista +
        custoCombustivel + pedagio + custosAdicionais + taxaPeso;
    
    let valorIcms = custoTotal * icms;
    let valorTaxaFederal = custoTotal * taxaFederal;
    let custoTotalComImpostos = custoTotal + valorIcms + valorTaxaFederal;

    let valorFrete = custoTotalComImpostos * (1 + lucro);
    let lucroLiquido = valorFrete - custoTotalComImpostos;

    document.getElementById("resultado").innerHTML = `
        <p><strong>Valor do Frete:</strong> R$ ${valorFrete.toFixed(2)}</p>
        <p><strong>Custo Total:</strong> R$ ${custoTotalComImpostos.toFixed(2)}</p>
        <p><strong>Custo com Combustível:</strong> R$ ${custoCombustivel.toFixed(2)}</p>
        <p><strong>Consumo de Combustível:</strong> ${consumoCombustivel.toFixed(2)} L</p>
        <p><strong>Lucro Líquido:</strong> R$ ${lucroLiquido.toFixed(2)}</p>
    `;
}
