// Obtém o título e troca por outro valor
//
var titulo         = document.querySelector(".titulo");
titulo.textContent = "Aparecida nutricionista";

// Busca o primeiro paciente
//
var tdPaciente = document.querySelector("#primeiro-paciente");
var peso       = tdPaciente.querySelector(".info-peso").textContent;
var altura     = tdPaciente.querySelector(".info-altura").textContent;

var imc   = peso / (altura * altura);

var tdImc         = tdPaciente.querySelector(".info-imc");
tdImc.textContent = imc;