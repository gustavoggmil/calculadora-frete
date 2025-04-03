function organizarPDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    // Cabeçalho com cores e informações
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(0, 102, 204);  // Cor azul para o título
    doc.text("Relatório de Cálculo de Frete", 20, 20);

    // Subtítulo
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);  // Texto preto
    doc.text("MMB Transportes LTDA", 20, 30);

    // Linha separadora
    doc.setDrawColor(0, 0, 0);
    doc.line(20, 35, 190, 35);

    // Detalhes do cálculo
    doc.setFontSize(14);
    doc.text(`Origem: ${window.calculoFreteData.origem || 'Não informado'}`, 20, 45);
    doc.text(`Destino: ${window.calculoFreteData.destino || 'Não informado'}`, 20, 55);
    doc.text(`Valor do Frete: R$ ${window.calculoFreteData.valorFrete ? window.calculoFreteData.valorFrete.toFixed(2) : 'Não calculado'}`, 20, 65);
    doc.text(`Custo Total com Impostos: R$ ${window.calculoFreteData.custoTotalComImpostos ? window.calculoFreteData.custoTotalComImpostos.toFixed(2) : 'Não calculado'}`, 20, 75);
    doc.text(`Lucro Líquido: R$ ${window.calculoFreteData.lucroLiquido ? window.calculoFreteData.lucroLiquido.toFixed(2) : 'Não calculado'}`, 20, 85);

    // Linha separadora
    doc.setDrawColor(0, 0, 0);
    doc.line(20, 90, 190, 90);

    // Detalhes de custos
    doc.setFontSize(12);
    doc.setTextColor(0, 102, 204);  // Cor azul para os títulos de seção
    doc.text("Detalhes de Custos:", 20, 100);

    // Custos específicos
    doc.setTextColor(0, 0, 0);  // Cor preta para o texto normal
    doc.text("Seguro da Carga: R$ 350,00", 20, 110);
    doc.text("Desembarque: R$ 1500,00", 20, 120);
    doc.text("Pancard Vale Pedágio: R$ 260,00", 20, 130);
    doc.text("Cadastro Motorista: R$ 60,00", 20, 140);
    doc.text(`Custo Combustível: R$ ${window.calculoFreteData.custoCombustivel ? window.calculoFreteData.custoCombustivel.toFixed(2) : 'Não calculado'}`, 20, 150);

    // Impostos
    doc.setTextColor(0, 102, 204);  // Cor azul para os títulos de impostos
    doc.text("Impostos:", 20, 160);
    doc.setTextColor(0, 0, 0);  // Texto preto para o conteúdo
    doc.text(`ICMS: ${window.calculoFreteData.icms || 'Não informado'}%`, 20, 170);
    doc.text(`Taxa Federal: ${window.calculoFreteData.taxaFederal || 'Não informado'}%`, 20, 180);

    // Linha separadora
    doc.line(20, 185, 190, 185);

    // Rodapé com a data
    doc.setFontSize(10);
    const currentDate = new Date().toLocaleDateString();
    doc.setTextColor(102, 102, 102);  // Cor cinza para o rodapé
    doc.text(`Data de Emissão: ${currentDate}`, 20, 195);

    // Gerar o PDF
    doc.save("relatorio_cotacao_frete.pdf");

    // Escondendo o "loading"
    document.getElementById('loading').style.display = 'none';
}

// Chamar a função ao clicar no botão
document.getElementById('gerar-pdf').addEventListener('click', function() {
    document.getElementById('loading').style.display = 'block';  // Exibir o "loading"
    setTimeout(organizarPDF, 1000);  // Simula um pequeno delay para o "loading"
});
