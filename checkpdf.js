function organizarPDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    
    // Definindo título
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255);  // Cor azul para o título
    doc.text("Relatório de Cálculo de Frete", 20, 20);
    doc.setTextColor(0, 0, 0);  // Cor preta para o texto normal
    
    // Subtítulo
    doc.setFontSize(14);
    doc.text("MMB Transportes LTDA", 20, 30);
    
    // Dados do cálculo
    doc.setFontSize(12);
    doc.text(`Origem: ${window.calculoFreteData.origem}`, 20, 40);
    doc.text(`Destino: ${window.calculoFreteData.destino}`, 20, 50);
    doc.text(`Valor do Frete: R$ ${window.calculoFreteData.valorFrete.toFixed(2)}`, 20, 60);
    doc.text(`Custo Total com Impostos: R$ ${window.calculoFreteData.custoTotalComImpostos.toFixed(2)}`, 20, 70);
    doc.text(`Lucro Líquido: R$ ${window.calculoFreteData.lucroLiquido.toFixed(2)}`, 20, 80);
    
    // Adicionando uma linha
    doc.setDrawColor(0, 0, 0);
    doc.line(20, 85, 190, 85);  // Linha horizontal para separar as seções

    // Adicionando detalhes de custos
    doc.setFontSize(12);
    doc.text("Detalhes de Custos:", 20, 95);
    
    doc.text("Seguro da Carga: R$ 350,00", 20, 105);
    doc.text("Desembarque: R$ 1500,00", 20, 115);
    doc.text("Pancard Vale Pedágio: R$ 260,00", 20, 125);
    doc.text("Cadastro Motorista: R$ 60,00", 20, 135);
    doc.text("Custo Combustível: R$ " + (window.calculoFreteData.custoCombustivel).toFixed(2), 20, 145);

    // Mais detalhes
    doc.text("ICMS: " + window.calculoFreteData.icms + "%", 20, 155);
    doc.text("Taxa Federal: " + window.calculoFreteData.taxaFederal + "%", 20, 165);

    // Adicionando mais uma linha
    doc.line(20, 170, 190, 170);  // Linha horizontal

    // Rodapé com a data
    doc.setFontSize(10);
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Data de Emissão: ${currentDate}`, 20, 180);

    // Gerar o PDF
    doc.save("relatorio_cotacao_frete.pdf");

    // Mostrar o "loading" durante o processo
    document.getElementById('loading').style.display = 'none';  // Esconder o "loading"
}

document.getElementById('gerar-pdf').addEventListener('click', function() {
    document.getElementById('loading').style.display = 'block';  // Exibir o "loading"
    setTimeout(organizarPDF, 1000);  // Simula um pequeno delay para o "loading"
});
