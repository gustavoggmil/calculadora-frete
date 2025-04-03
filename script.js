document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("freteForm").addEventListener("submit", function(event) {
        event.preventDefault();
        calcularFrete();
    });
});

function calcularFrete() {
    console.log("Iniciando cálculo...");

    let origem = document.getElementById("origem").value;
    let destino = document.getElementById("destino").value;
    let km = parseFloat(document.getElementById("distancia").value);
    let eixos = parseInt(document.getElementById("eixos").value);
    let pedagio = parseFloat(document.getElementById("pedagio").value);
    let icms = parseFloat(document.getElementById("icms").value) / 100;
    let taxaFederal = parseFloat(document.getElementById("taxaFederal").value) / 100;
    let kmPorLitro = parseFloat(document.getElementById("kmPorLitro").value);
    let precoCombustivel = parseFloat(document.getElementById("precoCombustivel").value);
    let pesoCarga = parseFloat(document.getElementById("pesoCarga").value);
    let custosAdicionais = parseFloat(document.getElementById("custosAdicionais").value);
    let lucro = parseFloat(document.getElementById("lucro").value) / 100;

    if (isNaN(km) || isNaN(eixos) || isNaN(pedagio) || isNaN(icms) || isNaN(taxaFederal) || 
        isNaN(kmPorLitro) || isNaN(precoCombustivel) || isNaN(pesoCarga) || isNaN(custosAdicionais) || isNaN(lucro)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let seguroCarga = 350.00;
    let desembarque = 1500.00;
    let pancardValePedagio = 260.00;
    let buonnyCadastroMotorista = 60.00;

    let consumoCombustivel = km / kmPorLitro;
    let custoCombustivel = consumoCombustivel * precoCombustivel;
    let taxaPeso = pesoCarga * 0.05;

    let custoTotal = seguroCarga + desembarque + pancardValePedagio + buonnyCadastroMotorista +
        custoCombustivel + pedagio + custosAdicionais + taxaPeso;

    let valorICMS = custoTotal * icms;
    let valorTaxaFederal = custoTotal * taxaFederal;
    let custoTotalComImpostos = custoTotal + valorICMS + valorTaxaFederal;
    let valorFrete = custoTotalComImpostos * (1 + lucro);
    let lucroLiquido = valorFrete - custoTotalComImpostos;

    console.log("Cálculo concluído, exibindo resultado...");

    document.getElementById("resultado").innerHTML = `
        <p><strong>Origem:</strong> ${origem}</p>
        <p><strong>Destino:</strong> ${destino}</p>
        <p><strong>Valor do Frete:</strong> R$ ${valorFrete.toFixed(2)}</p>
        <p><strong>Custo Total:</strong> R$ ${custoTotalComImpostos.toFixed(2)}</p>
        <p><strong>Consumo de Combustível:</strong> ${consumoCombustivel.toFixed(2)} L</p>
        <p><strong>Lucro Líquido:</strong> R$ ${lucroLiquido.toFixed(2)}</p>
    `;

    document.getElementById("gerarPdf").style.display = "block";
}

function gerarPDF() {
    console.log("Gerando PDF...");

    let resultado = document.getElementById("resultado").innerText;

    if (!resultado) {
        alert("Calcule o frete antes de gerar o PDF!");
        return;
    }

    let pdf = new window.jspdf.jsPDF();
    
    pdf.text("MMB Transportes LTDA", 10, 10);
    pdf.text("Relatório de Cotação de Frete", 10, 20);
    pdf.text(resultado, 10, 30);

    pdf.save("cotacao_frete.pdf");
}
