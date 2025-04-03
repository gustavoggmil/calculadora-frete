document.addEventListener("DOMContentLoaded", function() {
    let calcularFreteBtn = document.getElementById("calcularFrete");
    let gerarPdfBtn = document.getElementById("gerarPdf");

    if (calcularFreteBtn) {
        calcularFreteBtn.addEventListener("click", calcularFrete);
    }

    if (gerarPdfBtn) {
        gerarPdfBtn.addEventListener("click", gerarPDF);
    }
});

function calcularFrete() {
    console.log("Iniciando cálculo...");

    let origem = document.getElementById("origem")?.value || "";
    let destino = document.getElementById("destino")?.value || "";
    let km = parseFloat(document.getElementById("distancia")?.value) || 0;
    let eixos = parseInt(document.getElementById("eixos")?.value) || 0;
    let pedagio = parseFloat(document.getElementById("pedagio")?.value) || 0;
    let icms = parseFloat(document.getElementById("icms")?.value) / 100 || 0;
    let taxaFederal = parseFloat(document.getElementById("taxaFederal")?.value) / 100 || 0;
    let kmPorLitro = parseFloat(document.getElementById("kmPorLitro")?.value) || 0;
    let precoCombustivel = parseFloat(document.getElementById("precoCombustivel")?.value) || 0;
    let pesoCarga = parseFloat(document.getElementById("pesoCarga")?.value) || 0;
    let custosAdicionais = parseFloat(document.getElementById("custosAdicionais")?.value) || 0;
    let lucro = parseFloat(document.getElementById("lucro")?.value) / 100 || 0;

    if (!origem || !destino || km <= 0 || eixos <= 0 || kmPorLitro <= 0 || precoCombustivel <= 0) {
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
        <p><strong>Lucro Líquido:</strong> R$ ${lucroLiquido.toFixed(2)}</p>
    `;

    document.getElementById("gerarPdf").style.display = "block";
}

function gerarPDF() {
    console.log("Gerando PDF...");

    const { jsPDF } = window.jspdf;
    let pdf = new jsPDF();

    let resultado = document.getElementById("resultado")?.innerText || "Nenhum resultado disponível";

    pdf.text("MMB Transportes - Cotação de Frete", 10, 10);
    pdf.text(resultado, 10, 20);
    pdf.save("cotacao_frete.pdf");
}
