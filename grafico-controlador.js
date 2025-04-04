document.addEventListener('DOMContentLoaded', () => {
    const botaoDetalhar = document.getElementById('btn-detalhar'); // Altere para o ID real do botão
    const grafico = document.getElementById('grafico-pizza');

    if (botaoDetalhar && grafico) {
        botaoDetalhar.addEventListener('click', () => {
            grafico.classList.add('subir');
        });
    }

    // Se tiver um botão de fechar detalhes, adicione também:
    const botaoFechar = document.getElementById('btn-fechar-detalhes'); // Altere se tiver esse botão
    if (botaoFechar) {
        botaoFechar.addEventListener('click', () => {
            grafico.classList.remove('subir');
        });
    }
});
