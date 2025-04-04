document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('graficoPizza');
    const container = document.getElementById('grafico-pizza-container');
    const detalhes = document.getElementById('lista-detalhes');

    let detalhesVisiveis = false;

    canvas.onclick = (event) => {
        const chart = window.graficoPizzaInstancia;
        if (!chart) return;

        const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

        if (activePoints.length > 0) {
            const index = activePoints[0].index;
            const label = chart.data.labels[index];
            const valor = chart.data.datasets[0].data[index];

            // Ativa o modo fullscreen
            container.classList.add('expandido');
            detalhesVisiveis = true;

            // Mostra os detalhes da fatia clicada
            if (label === 'Despesas') {
                detalhes.innerHTML = `
                    <h3>💸 Despesas</h3>
                    <ul>
                        <li>Seguro da carga</li>
                        <li>Desembarque</li>
                        <li>Vale pedágio (PanCard)</li>
                        <li>Cadastro (Buonny)</li>
                        <li>Combustível</li>
                        <li>Pedágio</li>
                        <li>ICMS</li>
                        <li>Taxa Federal</li>
                        <li>Custos adicionais</li>
                        <li>Taxa por peso</li>
                    </ul>
                    <p>Total: R$ ${valor.toFixed(2)}</p>
                    <button id="fechar-detalhes">Fechar</button>
                `;
            } else if (label === 'Lucro Líquido') {
                detalhes.innerHTML = `
                    <h3>💰 Lucro Líquido</h3>
                    <p>Valor que sobra após todas as despesas e impostos.</p>
                    <p>Total: R$ ${valor.toFixed(2)}</p>
                    <button id="fechar-detalhes">Fechar</button>
                `;
            }

            // Botão de fechar
            document.getElementById('fechar-detalhes').addEventListener('click', () => {
                container.classList.remove('expandido');
                detalhes.innerHTML = '';
                detalhesVisiveis = false;
            });
        }
    };
});
