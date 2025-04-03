function gerarPDF() {
    const { jsPDF } = window.jspdf;

    // Criação do PDF
    const doc = new jsPDF();
    const dados = window.calculoFreteData;

    doc.setFont("Arial", "B", 16);
    doc.text("MMB Transportes LTDA", 105, 10, null, null, 'center');
    doc.text("RELATÓRIO DE COTAÇÃO DE FRETE", 105, 20, null, null, 'center');
    doc.text(`Origem: ${dados.origem}`, 10, 30);
    doc.text(`Destino: ${dados.destino}`, 10, 40);
    doc.text(`Valor do Frete (R$): R$ ${dados.valorFrete.toFixed(2)}`, 10, 50);
    doc.text(`Custo Total com Impostos (R$): R$ ${dados.custoTotalComImpostos.toFixed(2)}`, 10, 60);
    doc.text(`Lucro Líquido (R$): R$ ${dados.lucroLiquido.toFixed(2)}`, 10, 70);

    // Salvar o PDF
    doc.save('cotacao_frete.pdf');
}
