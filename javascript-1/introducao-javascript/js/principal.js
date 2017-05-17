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
        paciente.classList.add("paciente-invalido");
    }

    if(altura <= 0 || altura > 3) {
        console.log("Altura inválida");
        alturaEhValida    = false;
        tdImc.textContent = "Altura inválida";
        paciente.classList.add("paciente-invalido");
    }

    // Cálculo do IMC
    //
    if(alturaEhValida && pesoEhValido) {
        var imc = peso / (altura * altura);
        tdImc.textContent = imc.toFixed(2);
    }
}

// Adicionando um evento ao botão do formulário
//
var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();
    
    var form = document.querySelector('#form-adiciona');

    var nome = form.nome.value;
    var peso = form.peso.value;
    var altura = form.altura.value;
    var gordura = form.gordura.value;

    var pacienteTr = document.createElement("tr");

    var nomeTd = document.createElement("td");
    var pesoTd = document.createElement("td");
    var alturaTd = document.createElement("td");
    var gorduraTd = document.createElement("td");
    var imcTd = document.createElement("td");

    nomeTd.textContent = nome;
    pesoTd.textContent = peso;
    alturaTd.textContent = altura;
    gorduraTd.textContent = gordura;

    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);

    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);

});