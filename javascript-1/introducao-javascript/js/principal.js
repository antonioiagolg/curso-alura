// Obtém o título e troca por outro valor
//
var titulo         = document.querySelector(".titulo");
titulo.textContent = "Aparecida nutricionista";

// Busca o primeiro paciente
//
var tdPaciente = document.querySelector("#primeiro-paciente");
var peso       = tdPaciente.querySelector(".info-peso").textContent;
var altura     = tdPaciente.querySelector(".info-altura").textContent;
var tdImc      = tdPaciente.querySelector(".info-imc");

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
    tdImc.textContent = imc;
}