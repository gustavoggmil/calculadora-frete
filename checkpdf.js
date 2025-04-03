// Função que organiza o PDF e gera o link de download
function organizarPDF(resultado) {
    // Exibe a mensagem de loading
    document.getElementById('loading').style.display = 'block';

    // Atraso para simular o tempo de processamento do PDF
    setTimeout(function () {
        // Aqui, o código para gerar o PDF seria chamado
        gerarPDF(resultado);

        // Esconde a mensagem de loading e exibe o botão para download
        document.getElementById('loading').style.display = 'none';
        document.getElementById('downloadBtn').style.display = 'block';
    }, 2000); // Simula 2 segundos de processamento
}

// Função para gerar o PDF com jsPDF
function gerarPDF(resultado) {
    const { origem, destino, distancia, eixos, pedagio, icms, taxa_federal, km_por_litro, preco_combustivel, peso_carga, custos_adicionais, lucro, valor_frete, custo_total_com_impostos, custo_combustivel, consumo_combustivel, lucro_liquido } = resultado;

    const doc = new jsPDF();
    doc.setFont("Arial", "B", 16);
    doc.text("Relatório de Cálculo de Frete", 105, 10, null, null, "center");
    doc.setFont("Arial", "", 12);

    doc.text(`Origem: ${origem}`, 20, 30);
    doc.text(`Destino: ${destino}`, 20, 40);
    doc.text(`Distância (km): ${distancia}`, 20, 50);
    doc.text(`Número de Eixos: ${eixos}`, 20, 60);
    doc.text(`Pedágio (R$): ${pedagio.toFixed(2)}`, 20, 70);
    doc.text(`ICMS (%): ${icms}`, 20, 80);
    doc.text(`Taxa Federal (%): ${taxa_federal}`, 20, 90);
    doc.text(`Consumo Médio (km/L): ${km_por_litro}`, 20, 100);
    doc.text(`Preço do Combustível (R$): ${preco_combustivel.toFixed(2)}`, 20, 110);
    doc.text(`Peso da Carga (kg): ${peso_carga}`, 20, 120);
    doc.text(`Custos Adicionais (R$): ${custos_adicionais.toFixed(2)}`, 20, 130);
    doc.text(`Margem de Lucro (%): ${lucro}`, 20, 140);
    doc.text(`Consumo de Combustível (L): ${consumo_combustivel.toFixed(2)}`, 20, 150);
    doc.text(`Custo Total (R$): ${custo_total_com_impostos.toFixed(2)}`, 20, 160);
    doc.text(`Valor do Frete (R$): ${valor_frete.toFixed(2)}`, 20, 170);
    doc.text(`Lucro Líquido (R$): ${lucro_liquido.toFixed(2)}`, 20, 180);

    // Gerando o arquivo PDF
    doc.save('cotacao_frete.pdf');
}

// Exemplo de como o resultado do cálculo seria passado para a função
const resultado = {
    origem: "São Paulo",
    destino: "Rio de Janeiro",
    distancia: 400,
    eixos: 3,
    pedagio: 50.0,
    icms: 18,
    taxa_federal: 5,
    km_por_litro: 6.5,
    preco_combustivel: 4.2,
    peso_carga: 15000,
    custos_adicionais: 100.0,
    lucro: 20,
    valor_frete: 1300.0,
    custo_total_com_impostos: 1200.0,
    custo_combustivel: 240.0,
    consumo_combustivel: 61.54,
    lucro_liquido: 100.0
};

// Chama a função para organizar e gerar o PDF após o cálculo
organizarPDF(resultado);
