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
    var alturaEhValida = validaAltura(altura);
    var pesoEhValido   = validaPeso(peso);

    if(!pesoEhValido) {
        console.log("Peso inválido");
        pesoEhValido      = false;
        tdImc.textContent = "Peso inválido";
        paciente.classList.add("paciente-invalido");
    }

    if(!alturaEhValida) {
        console.log("Altura inválida");
        alturaEhValida    = false;
        tdImc.textContent = "Altura inválida";
        paciente.classList.add("paciente-invalido");
    }

    // Cálculo do IMC
    //
    if(alturaEhValida && pesoEhValido) {
        var imc = calculaImc(peso, altura);
        tdImc.textContent = imc;
    }
}

function calculaImc(peso, altura) {
    var imc = 0;
    imc = peso / (altura * altura);
    return imc.toFixed(2);
}

function validaPeso(peso) {
    if(peso >= 0 && peso <= 1000) {
        return true;
    }

    return false;
}

function validaAltura(altura) {
    if(altura >= 0 && altura <= 3.00) {
        return true;
    }

    return false;
}