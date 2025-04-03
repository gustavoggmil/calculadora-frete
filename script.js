document.getElementById("calcular").addEventListener("click", function() {
    // Coleta dos dados do formulário
    const origem = document.getElementById("origem").value;
    const destino = document.getElementById("destino").value;
    const km = parseFloat(document.getElementById("distancia").value);
    const eixos = parseInt(document.getElementById("eixos").value);
    const pedagio = parseFloat(document.getElementById("pedagio").value);
    const icms = parseFloat(document.getElementById("icms").value);
    const taxa_federal = parseFloat(document.getElementById("taxa-federal").value);
    const km_por_litro = parseFloat(document.getElementById("km-por-litro").value);
    const preco_combustivel = parseFloat(document.getElementById("preco-combustivel").value);
    const peso_carga = parseFloat(document.getElementById("peso-carga").value);
    const custos_adicionais = parseFloat(document.getElementById("custos-adicionais").value);
    const lucro = parseFloat(document.getElementById("lucro").value);

    // Verificar se todos os campos foram preenchidos
    if (
        isNaN(km) || isNaN(eixos) || isNaN(pedagio) || isNaN(icms) || isNaN(taxa_federal) || 
        isNaN(km_por_litro) || isNaN(preco_combustivel) || isNaN(peso_carga) || 
        isNaN(custos_adicionais) || isNaN(lucro) || origem === "" || destino === ""
    ) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Função de cálculo do frete
    const calcularFrete = (km, eixos, pedagio, icms, taxa_federal, km_por_litro, preco_combustivel, peso_carga, custos_adicionais, lucro) => {
        const seguro_carga = 350.00;
        const desembarque = 1500.00;
        const pancard_vale_pedagio = 260.00;
        const buonny_cadastro_motorista = 60.00;

        const consumo_combustivel = km / km_por_litro;
        const custo_combustivel = consumo_combustivel * preco_combustivel;
        const taxa_peso = peso_carga * 0.05;  // Exemplo de taxa baseada no peso da carga

        const custo_total = (
            seguro_carga + desembarque + pancard_vale_pedagio + buonny_cadastro_motorista +
            custo_combustivel + pedagio + custos_adicionais + taxa_peso
        );

        const valor_icms = custo_total * (icms / 100);
        const valor_taxa_federal = custo_total * (taxa_federal / 100);
        const custo_total_com_impostos = custo_total + valor_icms + valor_taxa_federal;

        const valor_frete = custo_total_com_impostos * (1 + lucro / 100);
        const lucro_liquido = valor_frete - custo_total_com_impostos;

        return { valor_frete, custo_total_com_impostos, custo_combustivel, consumo_combustivel, lucro_liquido };
    };

    const { valor_frete, custo_total_com_impostos, custo_combustivel, consumo_combustivel, lucro_liquido } = calcularFrete(
        km, eixos, pedagio, icms, taxa_federal, km_por_litro, preco_combustivel, peso_carga, custos_adicionais, lucro
    );

    // Exibir resultado no HTML (relatório)
    const relatorioDiv = document.getElementById("relatorio");
    relatorioDiv.innerHTML = `
        <h3>Relatório de Cálculo de Frete</h3>
        <p><strong>Origem:</strong> ${origem}</p>
        <p><strong>Destino:</strong> ${destino}</p>
        <p><strong>Distância (km):</strong> ${km}</p>
        <p><strong>Número de Eixos:</strong> ${eixos}</p>
        <p><strong>Pedágio (R$):</strong> ${pedagio.toFixed(2)}</p>
        <p><strong>ICMS (%):</strong> ${icms}</p>
        <p><strong>Taxa Federal (%):</strong> ${taxa_federal}</p>
        <p><strong>Consumo Médio (km/L):</strong> ${km_por_litro}</p>
        <p><strong>Preço do Combustível (R$):</strong> ${preco_combustivel.toFixed(2)}</p>
        <p><strong>Peso da Carga (kg):</strong> ${peso_carga}</p>
        <p><strong>Custos Adicionais (R$):</strong> ${custos_adicionais.toFixed(2)}</p>
        <p><strong>Margem de Lucro (%):</strong> ${lucro}</p>
        <p><strong>Custo Total (R$):</strong> ${custo_total_com_impostos.toFixed(2)}</p>
        <p><strong>Valor do Frete (R$):</strong> ${valor_frete.toFixed(2)}</p>
        <p><strong>Lucro Líquido (R$):</strong> ${lucro_liquido.toFixed(2)}</p>
    `;

    // Gerar o PDF com o jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("MMB Transportes LTDA", 105, 10, null, null, "center");
    doc.text("RELATÓRIO DE COTAÇÃO DE FRETE", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Origem: ${origem}`, 10, 30);
    doc.text(`Destino: ${destino}`, 10, 40);
    doc.text(`Distância (km): ${km}`, 10, 50);
    doc.text(`Número de Eixos: ${eixos}`, 10, 60);
    doc.text(`Pedágio (R$): ${pedagio.toFixed(2)}`, 10, 70);
    doc.text(`ICMS (%): ${icms}`, 10, 80);
    doc.text(`Taxa Federal (%): ${taxa_federal}`, 10, 90);
    doc.text(`Consumo Médio (km/L): ${km_por_litro}`, 10, 100);
    doc.text(`Preço do Combustível (R$): ${preco_combustivel.toFixed(2)}`, 10, 110);
    doc.text(`Peso da Carga (kg): ${peso_carga}`, 10, 120);
    doc.text(`Custos Adicionais (R$): ${custos_adicionais.toFixed(2)}`, 10, 130);
    doc.text(`Margem de Lucro (%): ${lucro}`, 10, 140);

    doc.text(`Custo Total (R$): ${custo_total_com_impostos.toFixed(2)}`, 10, 150);
    doc.text(`Valor do Frete (R$): ${valor_frete.toFixed(2)}`, 10, 160);
    doc.text(`Lucro Líquido (R$): ${lucro_liquido.toFixed(2)}`, 10, 170);

    doc.save("relatorio_frete.pdf");
});
