// Obtém o título e troca por outro valor
//
var titulo         = document.querySelector(".titulo");
titulo.textContent = "Aparecida nutricionista";

// Busca todos os pacientes
//
var pacientes = document.querySelectorAll(".paciente")

// Percorrendo cada paciente
//
for(var i = 0; i < pacientes.length; i++) {
    var paciente = pacientes[i];
    var peso     = paciente.querySelector(".info-peso").textContent;
    var altura   = paciente.querySelector(".info-altura").textContent;
    var tdImc    = paciente.querySelector(".info-imc");

    // Validação do peso e da altura
    //
    var alturaEhValida = true;
    var pesoEhValido   = true;

    if(peso <= 0 || peso > 1000) {
        console.log("Peso inválido");
        pesoEhValido      = false;
        tdImc.textContent = "Peso inválido";
    }

    if(altura <= 0 || altura > 3) {
        console.log("Altura inválida");
        alturaEhValida    = false;
        tdImc.textContent = "Altura inválida";
    }

    // Cálculo do IMC
    //
    if(alturaEhValida && pesoEhValido) {
        var imc = peso / (altura * altura);
        tdImc.textContent = imc.toFixed(2);
    }
}