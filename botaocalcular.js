document.getElementById("calcular").addEventListener("click", function() {
    // Pegando os valores do formulário
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

    // Cálculos
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

    // Gerando o relatório
    document.getElementById("relatorio").innerHTML = `
        <h2>Relatório de Cotação de Frete</h2>
        <p><strong>Origem:</strong> ${origem}</p>
        <p><strong>Destino:</strong> ${destino}</p>
        <p><strong>Distância:</strong> ${distancia} km</p>
        <p><strong>Valor do Frete:</strong> R$ ${valorFrete.toFixed(2)}</p>
        <p><strong>Custo Total (com impostos):</strong> R$ ${custoTotalComImpostos.toFixed(2)}</p>
        <p><strong>Lucro Líquido:</strong> R$ ${lucroLiquido.toFixed(2)}</p>
    `;

    // Exibir o botão Gerar PDF
    document.getElementById("gerar-pdf").style.display = "block";
});
