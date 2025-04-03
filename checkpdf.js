document.addEventListener('DOMContentLoaded', function() {
    // Verifique se o botão 'Gerar PDF' e o 'relatorio' estão disponíveis
    const botaoGerarPDF = document.getElementById('gerar-pdf');
    const relatorio = document.getElementById('relatorio');

    // Verifique se os elementos existem antes de adicionar os eventos
    if (botaoGerarPDF && relatorio) {
        botaoGerarPDF.addEventListener('click', function() {
            // Exibe o loading enquanto organiza o PDF
            relatorio.innerHTML = "<p>Organizando PDF...</p>";

            // Chama o script de organização do PDF (pdf.js) após um breve delay para simular o processo
            setTimeout(function() {
                gerarPDF();
            }, 2000);  // Simulando um tempo de organização (2 segundos)
        });
    } else {
        console.error('Elementos não encontrados: Verifique se os IDs estão corretos.');
    }
});
