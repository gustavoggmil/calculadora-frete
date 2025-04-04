document.addEventListener("DOMContentLoaded", function () {
  function gerarGraficoPizza(lucroLiquido, despesas) {
    const graficoContainer = document.getElementById('grafico-pizza');
    const ctx = document.getElementById('graficoPizza').getContext('2d');

    if (window.graficoPizzaInstancia) {
      window.graficoPizzaInstancia.destroy();
    }

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
              exibirDetalhes("💸 Despesas", [
                "Seguro da carga",
                "Desembarque",
                "Vale pedágio (PanCard)",
                "Cadastro (Buonny)",
                "Combustível",
                "Pedágio",
                "ICMS",
                "Taxa Federal",
                "Custos adicionais",
                "Taxa por peso"
              ]);
            } else if (index === 1) {
              exibirDetalhes("💰 Lucro Líquido", [
                "Valor que sobra após todas as despesas e impostos."
              ]);
            }
          }
        }
      }
    });

    graficoContainer.style.display = 'block';
  }

  function exibirDetalhes(titulo, detalhes) {
    const container = document.getElementById('grafico-pizza-container');
    const listaDetalhes = document.getElementById('lista-detalhes');
    
    listaDetalhes.innerHTML = `<h3>${titulo}</h3><ul>${detalhes.map(item => `<li>${item}</li>`).join('')}</ul><button onclick='fecharDetalhes()'>Fechar</button>`;
    container.classList.add('expandido');
  }

  function fecharDetalhes() {
    document.getElementById('grafico-pizza-container').classList.remove('expandido');
  }

  document.addEventListener("graficoAtualizar", (event) => {
    const { lucroLiquido, despesasDetalhadas } = event.detail;
    const totalDespesas = despesasDetalhadas.reduce((acc, item) => acc + item.valor, 0);
    gerarGraficoPizza(lucroLiquido, totalDespesas);
  });
});
