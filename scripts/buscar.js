var barraBusca = document.querySelector("#busca");

barraBusca.addEventListener("input", function() {
    var contatos = document.querySelectorAll(".contato");

    if (this.value.length > 0) {
        for (var i = 0; i < contatos.length; i++) {
            var contato = contatos[i];
            var nome = contato.querySelector(".contato-nome").textContent;
            var sobrenome = contato.querySelector(".contato-sobrenome").textContent;
            var nomeCompleto = `${nome} ${sobrenome}`
            var email = contato.querySelector(".contato-email").textContent;
            var cpf = contato.querySelector(".contato-cpf").textContent;
            var telefone = contato.querySelector(".contato-telefone").textContent;

            var expressao = new RegExp(this.value, "i");

            if (!expressao.test(nome) && !expressao.test(sobrenome) && !expressao.test(nomeCompleto) && !expressao.test(email) && !expressao.test(cpf) && !expressao.test(telefone)) {
                contato.classList.add("invisivel");
            } else {
                contato.classList.remove("invisivel");
            }
        }
    } else {
        for (let i = 0; i < contatos.length; i++) {
            var contato = contatos[i].classList.remove("invisivel");
        }
    }
});
