const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const readline = require('readline');

async function calcularFrete(km, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro) {
    const seguroCarga = 350.00;
    const desembarque = 1500.00;
    const pancardValePedagio = 260.00;
    const buonnyCadastroMotorista = 60.00;
    
    const consumoCombustivel = km / kmPorLitro;
    const custoCombustivel = consumoCombustivel * precoCombustivel;
    const taxaPeso = pesoCarga * 0.05; // Exemplo de taxa baseada no peso da carga
    
    const custoTotal = seguroCarga + desembarque + pancardValePedagio + buonnyCadastroMotorista + custoCombustivel + pedagio + custosAdicionais + taxaPeso;
    const valorIcms = custoTotal * (icms / 100);
    const valorTaxaFederal = custoTotal * (taxaFederal / 100);
    const custoTotalComImpostos = custoTotal + valorIcms + valorTaxaFederal;
    
    const valorFrete = custoTotalComImpostos * (1 + lucro / 100);
    const lucroLiquido = valorFrete - custoTotalComImpostos;
    
    return { valorFrete, custoTotalComImpostos, custoCombustivel, consumoCombustivel, lucroLiquido };
}

async function gerarRelatorio(dados) {
    const { origem, destino, km, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro, valorFrete, custoTotalComImpostos, custoCombustivel, consumoCombustivel, lucroLiquido } = dados;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    
    let y = height - 50;
    page.drawText("MMB Transportes LTDA - COTAÇÃO DE FRETE", { x: 50, y, size: 20, color: rgb(0, 0, 1) });
    y -= 30;
    
    const conteudo = [
        `Origem: ${origem}`,
        `Destino: ${destino}`,
        `Distância (km): ${km.toFixed(2)}`,
        `Número de Eixos: ${eixos}`,
        `Pedágio (R$): ${pedagio.toFixed(2)}`,
        `ICMS (%): ${icms}`,
        `Taxa Federal (%): ${taxaFederal}`,
        `Consumo Médio (km/L): ${kmPorLitro.toFixed(2)}`,
        `Preço do Combustível (R$): ${precoCombustivel.toFixed(2)}`,
        `Peso da Carga (kg): ${pesoCarga.toFixed(2)}`,
        `Custos Adicionais (R$): ${custosAdicionais.toFixed(2)}`,
        `Margem de Lucro (%): ${lucro}`,
        `Consumo de Combustível (L): ${consumoCombustivel.toFixed(2)}`,
        `Custo Total (R$): ${custoTotalComImpostos.toFixed(2)}`,
        `Valor do Frete (R$): ${valorFrete.toFixed(2)}`,
        `Lucro Líquido (R$): ${lucroLiquido.toFixed(2)}`
    ];
    
    conteudo.forEach(linha => {
        page.drawText(linha, { x: 50, y, size: 12 });
        y -= 20;
    });
    
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('cotacao_frete.pdf', pdfBytes);
    console.log('Relatório gerado: cotacao_frete.pdf');
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(pergunta) {
    return new Promise(resolve => {
        rl.question(pergunta, resposta => {
            resolve(parseFloat(resposta.replace(',', '.')) || resposta);
        });
    });
}

async function main() {
    console.log("Cálculo de Frete - MMB Transportes LTDA");
    const origem = await perguntar("Digite a origem: ");
    const destino = await perguntar("Digite o destino: ");
    const km = await perguntar("Digite a distância (km): ");
    const eixos = await perguntar("Digite o número de eixos: ");
    const pedagio = await perguntar("Digite o valor total de pedágios: ");
    const icms = await perguntar("Digite a porcentagem do ICMS: ");
    const taxaFederal = await perguntar("Digite a porcentagem da Taxa Federal: ");
    const kmPorLitro = await perguntar("Digite o consumo médio da carreta (km/L): ");
    const precoCombustivel = await perguntar("Digite o preço do combustível: ");
    const pesoCarga = await perguntar("Digite o peso da carga (kg): ");
    const custosAdicionais = await perguntar("Digite os custos adicionais: ");
    const lucro = await perguntar("Digite a porcentagem de lucro da empresa: ");
    
    const resultado = await calcularFrete(km, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro);
    
    await gerarRelatorio({
        origem, destino, km, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro,
        ...resultado
    });
    rl.close();
}

main();
