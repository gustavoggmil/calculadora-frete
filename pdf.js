// Função para gerar o PDF
function gerarPDF() {
    const { origem, destino, valorFrete, custoTotalComImpostos, lucroLiquido } = window.calculoFreteData;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text(`Relatório de Cálculo de Frete`, 10, 10);
    doc.text(`Origem: ${origem}`, 10, 20);
    doc.text(`Destino: ${destino}`, 10, 30);
    doc.text(`Valor do Frete (R$): R$ ${valorFrete.toFixed(2)}`, 10, 40);
    doc.text(`Custo Total com Impostos (R$): R$ ${custoTotalComImpostos.toFixed(2)}`, 10, 50);
    doc.text(`Lucro Líquido (R$): R$ ${lucroLiquido.toFixed(2)}`, 10, 60);

    doc.save('relatorio_frete.pdf');
}

// Adicionando o evento de clique para gerar o PDF
document.getElementById('gerar-pdf').addEventListener('click', gerarPDF);
