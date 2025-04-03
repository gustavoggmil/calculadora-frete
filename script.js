// Importa a biblioteca jsPDF (adicione isso ao seu HTML se necessário)
document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>');

function calcularFrete() {
    let origem = document.getElementById('origem').value;
    let destino = document.getElementById('destino').value;
    let km = parseFloat(document.getElementById('distancia').value);
    let eixos = parseInt(document.getElementById('eixos').value);
    let pedagio = parseFloat(document.getElementById('pedagio').value);
    let icms = parseFloat(document.getElementById('icms').value) / 100;
    let taxaFederal = parseFloat(document.getElementById('taxaFederal').value) / 100;
    let kmPorLitro = parseFloat(document.getElementById('kmPorLitro').value);
    let precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
    let pesoCarga = parseFloat(document.getElementById('pesoCarga').value);
    let custosAdicionais = parseFloat(document.getElementById('custosAdicionais').value);
    let lucro = parseFloat(document.getElementById('lucro').value) / 100;

    if (isNaN(km) || isNaN(eixos) || isNaN(pedagio) || isNaN(icms) || isNaN(taxaFederal) || 
        isNaN(kmPorLitro) || isNaN(precoCombustivel) || isNaN(pesoCarga) || 
        isNaN(custosAdicionais) || isNaN(lucro)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let seguroCarga = 350.00;
    let desembarque = 1500.00;
    let pancardValePedagio = 260.00;
    let buonnyCadastroMotorista = 60.00;
    
    let consumoCombustivel = km / kmPorLitro;
    let custoCombustivel = consumoCombustivel * precoCombustivel;
    let taxaPeso = pesoCarga * 0.05;
    
    let custoTotal = seguroCarga + desembarque + pancardValePedagio + buonnyCadastroMotorista + 
                     custoCombustivel + pedagio + custosAdicionais + taxaPeso;
    
    let valorIcms = custoTotal * icms;
    let valorTaxaFederal = custoTotal * taxaFederal;
    let custoTotalComImpostos = custoTotal + valorIcms + valorTaxaFederal;
    
    let valorFrete = custoTotalComImpostos * (1 + lucro);
    let lucroLiquido = valorFrete - custoTotalComImpostos;

    document.getElementById('resultado').innerHTML = `
        <p>Valor do Frete: <strong>R$ ${valorFrete.toFixed(2)}</strong></p>
        <p>Custo Total com Impostos: <strong>R$ ${custoTotalComImpostos.toFixed(2)}</strong></p>
        <p>Consumo de Combustível: <strong>${consumoCombustivel.toFixed(2)} L</strong></p>
        <p>Lucro Líquido: <strong>R$ ${lucroLiquido.toFixed(2)}</strong></p>
        <button onclick="gerarRelatorio('${origem}', '${destino}', ${km}, ${eixos}, ${pedagio}, ${icms}, ${taxaFederal}, ${kmPorLitro}, ${precoCombustivel}, ${pesoCarga}, ${custosAdicionais}, ${lucro}, ${valorFrete}, ${custoTotalComImpostos}, ${custoCombustivel}, ${consumoCombustivel}, ${lucroLiquido})">Baixar Relatório PDF</button>
    `;
}

function gerarRelatorio(origem, destino, km, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro, valorFrete, custoTotalComImpostos, custoCombustivel, consumoCombustivel, lucroLiquido) {
    const { jsPDF } = window.jspdf;
    let pdf = new jsPDF();

    pdf.setFontSize(16);
    pdf.text("MMB Transportes LTDA", 20, 20);
    pdf.text("RELATÓRIO DE COTAÇÃO DE FRETE", 20, 30);
    
    pdf.setFontSize(12);
    pdf.text(`Origem: ${origem}`, 20, 40);
    pdf.text(`Destino: ${destino}`, 20, 50);
    pdf.text(`Distância: ${km} km`, 20, 60);
    pdf.text(`Eixos: ${eixos}`, 20, 70);
    pdf.text(`Pedágio: R$ ${pedagio.toFixed(2)}`, 20, 80);
    pdf.text(`ICMS: ${(icms * 100).toFixed(2)}%`, 20, 90);
    pdf.text(`Taxa Federal: ${(taxaFederal * 100).toFixed(2)}%`, 20, 100);
    pdf.text(`Consumo Médio: ${kmPorLitro} km/L`, 20, 110);
    pdf.text(`Preço do Combustível: R$ ${precoCombustivel.toFixed(2)}`, 20, 120);
    pdf.text(`Peso da Carga: ${pesoCarga} kg`, 20, 130);
    pdf.text(`Custos Adicionais: R$ ${custosAdicionais.toFixed(2)}`, 20, 140);
    pdf.text(`Lucro (%): ${(lucro * 100).toFixed(2)}`, 20, 150);
    pdf.text(`Consumo de Combustível: ${consumoCombustivel.toFixed(2)} L`, 20, 160);
    pdf.text(`Custo Total: R$ ${custoTotalComImpostos.toFixed(2)}`, 20, 170);
    pdf.text(`Valor do Frete: R$ ${valorFrete.toFixed(2)}`, 20, 180);
    pdf.text(`Lucro Líquido: R$ ${lucroLiquido.toFixed(2)}`, 20, 190);

    pdf.save(`cotacao_frete_${origem}_${destino}.pdf`);
}
