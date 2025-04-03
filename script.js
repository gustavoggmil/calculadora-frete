function calcularFrete() {
    let peso = document.getElementById('peso').value;
    let distancia = document.getElementById('distancia').value;
    
    if (peso && distancia) {
        let frete = (peso * 0.5) + (distancia * 0.1);
        document.getElementById('resultado').innerText = "Valor do frete: R$ " + frete.toFixed(2);
    } else {
        alert("Preencha todos os campos!");
    }
}
