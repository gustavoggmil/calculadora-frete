<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Frete</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
</head>
<body>
    <h1>Calculadora de Frete</h1>
    
    <label>Origem:</label>
    <input type="text" id="origem"><br>

    <label>Destino:</label>
    <input type="text" id="destino"><br>

    <label>Distância (km):</label>
    <input type="number" id="km"><br>

    <label>Número de Eixos:</label>
    <input type="number" id="eixos"><br>

    <label>Pedágio (R$):</label>
    <input type="number" id="pedagio"><br>

    <label>ICMS (%):</label>
    <input type="number" id="icms"><br>

    <label>Taxa Federal (%):</label>
    <input type="number" id="taxaFederal"><br>

    <label>Consumo Médio (km/L):</label>
    <input type="number" id="kmPorLitro"><br>

    <label>Preço do Combustível (R$):</label>
    <input type="number" id="precoCombustivel"><br>

    <label>Peso da Carga (kg):</label>
    <input type="number" id="pesoCarga"><br>

    <label>Custos Adicionais (R$):</label>
    <input type="number" id="custosAdicionais"><br>

    <label>Margem de Lucro (%):</label>
    <input type="number" id="lucro"><br>

    <button id="calcular">Calcular</button>

    <script>
        function calcularFrete(km, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro) {
            const seguroCarga = 350.00;
            const desembarque = 1500.00;
            const pancardValePedagio = 260.00;
            const buonnyCadastroMotorista = 60.00;

            const consumoCombustivel = km / kmPorLitro;
            const custoCombustivel = consumoCombustivel * precoCombustivel;
            const taxaPeso = pesoCarga * 0.05;
            
            const custoTotal = seguroCarga + desembarque + pancardValePedagio + buonnyCadastroMotorista + 
                                custoCombustivel + pedagio + custosAdicionais + taxaPeso;
            
            const valorICMS = custoTotal * (icms / 100);
            const valorTaxaFederal = custoTotal * (taxaFederal / 100);
            const custoTotalComImpostos = custoTotal + valorICMS + valorTaxaFederal;
            
            const valorFrete = custoTotalComImpostos * (1 + lucro / 100);
            const lucroLiquido = valorFrete - custoTotalComImpostos;
            
            return { valorFrete, custoTotalComImpostos, custoCombustivel, consumoCombustivel, lucroLiquido };
        }

        function gerarRelatorio(origem, destino, km, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro, valores) {
            const { jsPDF } = window.jspdf || {};
            if (!jsPDF) {
                alert("Erro ao carregar a biblioteca jsPDF!");
                return;
            }

            const pdf = new jsPDF();
            const dataEmissao = new Date().toLocaleString('pt-BR');
            
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(16);
            pdf.text("MMB Transportes LTDA", 105, 15, { align: "center" });
            pdf.text("RELATÓRIO DE COTAÇÃO DE FRETE", 105, 25, { align: "center" });
            pdf.setFontSize(12);
            pdf.text(`Data de Emissão: ${dataEmissao}`, 105, 35, { align: "center" });
            pdf.setFontSize(10);

            let y = 45;
            const campos = [
                ["Origem", origem],
                ["Destino", destino],
                ["Distância (km)", km.toFixed(2)],
                ["Número de Eixos", eixos],
                ["Pedágio (R$)", `R$ ${pedagio.toFixed(2)}`],
                ["ICMS (%)", `${icms}%`],
                ["Taxa Federal (%)", `${taxaFederal}%`],
                ["Consumo Médio (km/L)", kmPorLitro.toFixed(2)],
                ["Preço do Combustível (R$)", `R$ ${precoCombustivel.toFixed(2)}`],
                ["Peso da Carga (kg)", `${pesoCarga.toFixed(2)} kg`],
                ["Custos Adicionais (R$)", `R$ ${custosAdicionais.toFixed(2)}`],
                ["Margem de Lucro (%)", `${lucro}%`],
                ["Consumo de Combustível (L)", `${valores.consumoCombustivel.toFixed(2)} litros`],
                ["Custo Total (R$)", `R$ ${valores.custoTotalComImpostos.toFixed(2)}`],
                ["Valor do Frete (R$)", `R$ ${valores.valorFrete.toFixed(2)}`],
                ["Lucro Líquido (R$)", `R$ ${valores.lucroLiquido.toFixed(2)}`]
            ];

            campos.forEach(([campo, valor]) => {
                pdf.text(`${campo}: ${valor}`, 20, y);
                y += 8;
            });
            
            pdf.save(`cotacao_frete_${origem}_${destino}.pdf`);
        }

        document.addEventListener("DOMContentLoaded", function() {
            document.getElementById("calcular").addEventListener("click", function() {
                const origem = document.getElementById("origem").value;
                const destino = document.getElementById("destino").value;
                const km = parseFloat(document.getElementById("km").value);
                const eixos = parseInt(document.getElementById("eixos").value);
                const pedagio = parseFloat(document.getElementById("pedagio").value);
                const icms = parseFloat(document.getElementById("icms").value);
                const taxaFederal = parseFloat(document.getElementById("taxaFederal").value);
                const kmPorLitro = parseFloat(document.getElementById("kmPorLitro").value);
                const precoCombustivel = parseFloat(document.getElementById("precoCombustivel").value);
                const pesoCarga = parseFloat(document.getElementById("pesoCarga").value);
                const custosAdicionais = parseFloat(document.getElementById("custosAdicionais").value);
                const lucro = parseFloat(document.getElementById("lucro").value);

                if (isNaN(km) || isNaN(eixos) || isNaN(pedagio) || isNaN(icms) || 
                    isNaN(taxaFederal) || isNaN(kmPorLitro) || isNaN(precoCombustivel) || 
                    isNaN(pesoCarga) || isNaN(custosAdicionais) || isNaN(lucro)) {
                    alert("Preencha todos os campos corretamente!");
                    return;
                }

                const valores = calcularFrete(km, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro);
                gerarRelatorio(origem, destino, km, eixos, pedagio, icms, taxaFederal, kmPorLitro, precoCombustivel, pesoCarga, custosAdicionais, lucro, valores);
            });
        });
    </script>
</body>
</html>
