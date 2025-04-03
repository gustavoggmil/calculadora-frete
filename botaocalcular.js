document.getElementById('calcular-frete').addEventListener('click', function() {
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

    // Calculando o frete
    const custoCombustivel = (distancia / kmPorLitro) * precoCombustivel;
    const valorFrete = (distancia * 0.1) + pedagio + custosAdicionais; // Exemplo de cálculo de frete
    const custoTotalComImpostos = valorFrete * (1 + icms / 100) * (1 + taxaFederal / 100);
    const lucroLiquido = custoTotalComImpostos * (lucro / 100);

    // Armazenando os dados no objeto global para o PDF
    window.calculoFreteData = {
        origem: origem,
        destino: destino,
        distancia: distancia,
        eixos: eixos,
        pedagio: pedagio,
        icms: icms,
        taxaFederal: taxaFederal,
        kmPorLitro: kmPorLitro,
        precoCombustivel: precoCombustivel,
        pesoCarga: pesoCarga,
        custosAdicionais: custosAdicionais,
        lucro: lucro,
        custoCombustivel: custoCombustivel,
        valorFrete: valorFrete,
        custoTotalComImpostos: custoTotalComImpostos,
        lucroLiquido: lucroLiquido
    };

    // Exibindo o relatório
    const relatorioDiv = document.getElementById('relatorio');
    relatorioDiv.innerHTML = `
        <h3>Relatório de Cálculo de Frete</h3>
        <p><strong>Origem:</strong> ${origem}</p>
        <p><strong>Destino:</strong> ${destino}</p>
        <p><strong>Distância:</strong> ${distancia} km</p>
        <p><strong>Valor do Frete:</strong> R$ ${valorFrete.toFixed(2)}</p>
        <p><strong>Custo Total com Impostos:</strong> R$ ${custoTotalComImpostos.toFixed(2)}</p>
        <p><strong>Lucro Líquido:</strong> R$ ${lucroLiquido.toFixed(2)}</p>
    `;

    // Mostrando o botão para gerar o PDF
    document.getElementById('gerar-pdf').style.display = 'inline-block';
});
