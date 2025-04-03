function calcularFrete(km, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro) {
    const seguroCarga = 350.00;
    const desembarque = 1500.00;
    const pancardValePedagio = 260.00;
    const buonnyCadastroMotorista = 60.00;

    const consumoCombustivel = km / kmPorLitro;
    const custoCombustivel = consumoCombustivel * precoCombustivel;

    const taxaPeso = pesoCarga * 0.05;  // Exemplo de taxa baseada no peso da carga

    const custoTotal = seguroCarga + desembarque + pancardValePedagio + buonnyCadastroMotorista + 
                        custoCombustivel + pedagio + custosAdicionais + taxaPeso;

    const valorIcms = custoTotal * (icms / 100);
    const valorTaxaFederal = custoTotal *
