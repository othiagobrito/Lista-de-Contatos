var botaoSalvar = document.querySelector("#salvar");
botaoSalvar.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#adiciona-contato")

    var contato = obtemDadosContato(form);

    insereContatoNaLista(contato)

    form.reset();
});

function obtemDadosContato(form) {
    var contato = {
        nome: form.nome.value,
        sobrenome: form.sobrenome.value,
        cpf: form.cpf.value,
        email: form.email.value,
        telefone: form.telefone.value,
    }

    return contato;
}

function insereContatoNaLista(contato) {
    var contatoTR = montaTR(contato);

    var tabela = document.querySelector("#tabela-contatos");
    tabela.appendChild(contatoTR);

}

function montaTR(contato) {

    var contatoTR = document.createElement("tr");
    contatoTR.classList.add("contato");
    
    contatoTR.appendChild(montaTD(contato.nome, "info-nome"));
    contatoTR.appendChild(montaTD(contato.sobrenome, "info-sobrenome"));
    contatoTR.appendChild(montaTD(contato.cpf, "info-cpf"));
    contatoTR.appendChild(montaTD(contato.email, "info-email"));
    contatoTR.appendChild(montaTD(contato.telefone, "info-email"));

    return contatoTR;
}

function montaTD(dado, classe) {

    var td = document.createElement("td");

    td.textContent = dado;
    td.classList.add(classe);

    return td;
}
