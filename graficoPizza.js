function gerarGraficoPizza(lucroLiquido, despesas) {
    const ctx = document.getElementById('graficoPizza').getContext('2d');

    // Apaga gráfico antigo, se existir
    if (window.graficoPizzaInstancia) {
        window.graficoPizzaInstancia.destroy();
    }

    // Cria gráfico
    window.graficoPizzaInstancia = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Despesas', 'Lucro Líquido'],
            datasets: [{
                data: [despesas, lucroLiquido],
                backgroundColor: ['#e74c3c', '#2ecc71'],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: R$ ${context.raw.toFixed(2)}`;
                        }
                    }
                }
            },
            onClick: (e, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    if (index === 0) {
                        alert("💸 Despesas:\n\n- Seguro da carga\n- Desembarque\n- Vale pedágio (PanCard)\n- Cadastro (Buonny)\n- Combustível\n- Pedágio\n- ICMS\n- Taxa Federal\n- Custos adicionais\n- Taxa por peso");
                    } else if (index === 1) {
                        alert("💰 Lucro Líquido:\n\n- Valor que sobra após todas as despesas e impostos.");
                    }
                }
            }
        }
    });

    // Exibe o container do gráfico
    document.getElementById('container-grafico').style.display = 'block';
}

// Executa após clique no botão "Calcular Frete"
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calcular-frete').addEventListener('click', () => {
        const data = window.calculoFreteData;
        if (!data) return;

        const despesas = data.custoTotalComImpostos || 0;
        const lucro = data.lucroLiquido || 0;
        gerarGraficoPizza(lucro, despesas);
    });
});
