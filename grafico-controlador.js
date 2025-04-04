document.addEventListener('DOMContentLoaded', () => {
    const graficoContainer = document.getElementById('grafico-pizza-container');
    const canvas = document.getElementById('graficoPizza');
    const listaDetalhes = document.getElementById('lista-detalhes');

    if (!canvas || !graficoContainer) return;

    // Ativa quando clica em uma fatia do gráfico
    canvas.onclick = function(evt) {
        const chart = window.graficoPizzaInstancia;
        const activePoints = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);

        if (activePoints.length > 0) {
            const index = activePoints[0].index;
            let detalhes = '';

            if (index === 0) {
                detalhes = `
                    <h2>💸 Despesas</h2>
                    <ul>
                        <li>- Seguro da carga</li>
                        <li>- Desembarque</li>
                        <li>- Vale pedágio (PanCard)</li>
                        <li>- Cadastro (Buonny)</li>
                        <li>- Combustível</li>
                        <li>- Pedágio</li>
                        <li>- ICMS</li>
                        <li>- Taxa Federal</li>
                        <li>- Custos adicionais</li>
                        <li>- Taxa por peso</li>
                    </ul>
                `;
            } else if (index === 1) {
                detalhes = `
                    <h2>💰 Lucro Líquido</h2>
                    <p>Valor que sobra após todas as despesas e impostos.</p>
                `;
            }

            // Expandir gráfico e mostrar detalhes
            graficoContainer.classList.add('expandido');
            listaDetalhes.innerHTML = detalhes;
            listaDetalhes.classList.add('mostrar');
        }
    };

    // Fecha ao clicar fora
    document.addEventListener('click', function(e) {
        if (
            graficoContainer.classList.contains('expandido') &&
            !graficoContainer.contains(e.target)
        ) {
            graficoContainer.classList.remove('expandido');
            listaDetalhes.classList.remove('mostrar');
            listaDetalhes.innerHTML = '';
        }
    });
});
