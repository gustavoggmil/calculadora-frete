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

    // Cálculo do custo de combustível
    const custoCombustivel = (distancia / kmPorLitro) * precoCombustivel;

    // Cálculo do valor base do frete (simples exemplo, poderia depender de mais fatores)
    const valorBaseFrete = distancia * (0.5 + (eixos * 0.1));  // Ajuste com base nos eixos

    // Cálculo do custo total do frete com pedágio e custos adicionais
    const valorFrete = valorBaseFrete + pedagio + custosAdicionais + custoCombustivel;

    // Aplicando os impostos sobre o valor do frete
    const custoTotalComImpostos = valorFrete * (1 + icms / 100) * (1 + taxaFederal / 100);

    // Aplicando a margem de lucro
    const lucroLiquido = custoTotalComImpostos * (1 + lucro / 100);

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
        <p><strong>Valor Base do Frete:</strong> R$ ${valorBaseFrete.toFixed(2)}</p>
        <p><strong>Custo Combustível:</strong> R$ ${custoCombustivel.toFixed(2)}</p>
        <p><strong>Custo Total do Frete:</strong> R$ ${valorFrete.toFixed(2)}</p>
        <p><strong>Custo Total com Impostos:</strong> R$ ${custoTotalComImpostos.toFixed(2)}</p>
        <p><strong>Lucro Líquido:</strong> R$ ${lucroLiquido.toFixed(2)}</p>
    `;

    // Mostrando o botão para gerar o PDF
    document.getElementById('gerar-pdf').style.display = 'inline-block';
});
