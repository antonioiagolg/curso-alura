var botaoBuscar = document.querySelector("#buscar-pacientes");

botaoBuscar.addEventListener("click", function() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
    xhr.addEventListener("load", function() {

        var erroAjax = document.querySelector("#erro-ajax");

        if(this.status == 200) {
            var pacientes = JSON.parse(this.responseText);
            pacientes.forEach(function(paciente) {
                adicionaPacienteNaTabela(paciente);
            });
            erroAjax.classList.add("invisivel");
        } else {
            erroAjax.classList.remove("invisivel");
        }
        
    });
    xhr.send();
});