document.getElementById('gerar-pdf').addEventListener('click', function() {
    // Exibe o loading enquanto organiza o PDF
    document.getElementById('relatorio').innerHTML = "<p>Organizando PDF...</p>";

    // Chama o script de organização do PDF (pdf.js) após um breve delay para simular o processo
    setTimeout(function() {
        gerarPDF();
    }, 2000);  // Simulando um tempo de organização (2 segundos)
});
