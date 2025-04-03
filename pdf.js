document.getElementById("gerar-pdf").addEventListener("click", function() {
    const doc = new jsPDF();

    // Adicionando o título e os dados do relatório no PDF
    doc.setFont("Arial", "B", 16);
    doc.text("MMB Transportes LTDA", 105, 10, { align: "center" });
    doc.text("RELATÓRIO DE COTAÇÃO DE FRETE", 105, 20, { align: "center" });

    doc.setFont("Arial", "", 12);
    doc.text("Origem: " + document.getElementById("origem").value, 10, 40);
    doc.text("Destino: " + document.getElementById("destino").value, 10, 50);
    doc.text("Distância: " + document.getElementById("distancia").value + " km", 10, 60);
    doc.text("Valor do Frete: R$ " + valorFrete.toFixed(2), 10, 70);
    doc.text("Custo Total (com impostos): R$ " + custoTotalComImpostos.toFixed(2), 10, 80);
    doc.text("Lucro Líquido: R$ " + lucroLiquido.toFixed(2), 10, 90);

    doc.save("cotacao_frete.pdf");
});
