// Função para calcular o frete
function calcularFrete() {
    // Coletando os dados do formulário
    const origem = document.getElementById('origem').value;
    const destino = document.getElementById('destino').value;
    const distancia = parseFloat(document.getElementById('distancia').value);
    const eixos = parseInt(document.getElementById('eixos').value);
    const pedagio = parseFloat(document.getElementById('pedagio').value);
    const icms = parseFloat(document.getElementById('icms').value);
    const taxaFederal = parseFloat(document.getElementById('taxa-federal').value);
    const kmPorLitro = parseFloat(document.getElementById('km-por-litro').value);
    const precoCombustivel = parseFloat(document.getElementById('preco-combustivel').value);
    const pesoCarga = parseFloat(document.getElementById('peso-carga').value);
    const custosAdicionais = parseFloat(document.getElementById('custos-adicionais').value);
    const lucro = parseFloat(document.getElementById('lucro').value);

    // Cálculos fixos
    const seguroCarga = 350.00;
    const desembarque = 1500.00;
    const pancardValePedagio = 260.00;
    const buonnyCadastroMotorista = 60.00;

    // Cálculo do combustível
    const consumoCombustivel = distancia / kmPorLitro;
    const custoCombustivel = consumoCombustivel * precoCombustivel;

    // Taxa por peso
    const taxaPeso = pesoCarga * 0.05;

    // Custo total antes dos impostos
    const custoTotal = seguroCarga + desembarque + pancardValePedagio + buonnyCadastroMotorista +
        custoCombustivel + pedagio + custosAdicionais + taxaPeso;

    // Impostos
    const valorIcms = custoTotal * (icms / 100);
    const valorTaxaFederal = custoTotal * (taxaFederal / 100);
    const custoTotalComImpostos = custoTotal + valorIcms + valorTaxaFederal;

    // Valor final do frete
    const valorFrete = custoTotalComImpostos * (1 + lucro / 100);
    const lucroLiquido = valorFrete - custoTotalComImpostos;

    // Exibindo o resultado
    document.getElementById('relatorio').innerHTML = `
        <h3>Resultado do Cálculo:</h3>
        <p><strong>Origem:</strong> ${origem}</p>
        <p><strong>Destino:</strong> ${destino}</p>
        <p><strong>Distância:</strong> ${distancia} km</p>
        <p><strong>Valor do Frete:</strong> R$ ${valorFrete.toFixed(2)}</p>
        <p><strong>Custo Total com Impostos:</strong> R$ ${custoTotalComImpostos.toFixed(2)}</p>
        <p><strong>Lucro Líquido:</strong> R$ ${lucroLiquido.toFixed(2)}</p>
    `;

    // Mostrar botão PDF
    document.getElementById('gerar-pdf').style.display = 'inline-block';

    // Armazenar os dados para o PDF
    window.calculoFreteData = {
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
    };
}

// Adicionando o evento de clique
document.getElementById('calcular-frete').addEventListener('click', calcularFrete);
