window.addEventListener("load", pega_info);

var db = openDatabase("contatosDB", "1.0", "Lista de Contatos", 2 * 1024 * 1024);

function pega_info() {
    document.getElementById("salvar").addEventListener("click", salvar);
    document.getElementById("apagar").addEventListener("click", deletar);

    db.transaction(function(sql) {
        sql.executeSql("CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT, cpf TEXT, email TEXT, telefone TEXT)");
    });

    listar_contatos();
}

function salvar() {
    var id = document.getElementById("field-id").value;
    var nome = document.getElementById("nome").value;
    var sobrenome = document.getElementById("sobrenome").value;
    var cpf = document.getElementById("cpf").value;
    var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;
    
    if (nome.length > 0 && sobrenome.length > 0 && telefone.length > 0) {
        db.transaction(function(sql) {
            if (id) {
                sql.executeSql("UPDATE contatos SET nome=?, sobrenome=?, cpf=?, email=?, telefone=? WHERE id=?", [nome, sobrenome, cpf, email, telefone, id], null);
            } else {
                sql.executeSql("INSERT INTO contatos (nome, sobrenome, cpf, email, telefone) VALUES (?, ?, ?, ?, ?)", [nome, sobrenome, cpf, email, telefone]);
            }
        });
    }

    listar_contatos();
}

function listar_contatos() {        
    var table = document.getElementById("tabela-contatos");

    db.transaction(function(sql) {
        sql.executeSql("SELECT * FROM contatos", [], function (sql, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++) {
                    tr += '<tr>';
                    tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].nome + '</td>';
                    tr += '<td>' + rows[i].sobrenome + '</td>';
                    tr += '<td>' + rows[i].cpf + '</td>';
                    tr += '<td>' + rows[i].email + '</td>';
                    tr += '<td>' + rows[i].telefone + '</td>';
                    tr += '</tr>';                   
            }
                table.innerHTML = tr;

        }, null);
    });
}

function atualizar(_id) {   
    var id = document.getElementById("field-id");
    var nome = document.getElementById("nome");
    var sobrenome = document.getElementById("sobrenome");
    var cpf = document.getElementById("cpf");
    var email = document.getElementById("email");
    var telefone = document.getElementById("telefone");
    
    id.value = _id;
    
    db.transaction(function(sql) {
        sql.executeSql("SELECT * FROM contatos WHERE id=?", [_id], function (sql, resultado) {
            var rows = resultado.rows[0];

            nome.value = rows.nome;
            sobrenome.value = rows.sobrenome;
            cpf.value = rows.cpf;
            email.value = rows.email;
            telefone.value = rows.telefone;
        });
    });
}

function deletar() {
    var id = document.getElementById("field-id").value;
    
    db.transaction(function(sql) {
        sql.executeSql("DELETE FROM contatos WHERE id=?", [id]);
    });
    
    listar_contatos();
}
