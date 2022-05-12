window.addEventListener("load", pega_info);

var db = openDatabase("Contatos", "1.0", "Lista de Contatos", 2 * 1024 * 1024);

function pega_info() {
    document.getElementById("salvar").addEventListener("click", salvar);

    db.transaction(function(sql) {
        sql.executeSql("CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT, cpf TEXT, email TEXT, telefone TEXT)");
    });

    listar_contatos();
}

function salvar() {
    var id = document.getElementById('id').value;
    var nome = document.getElementById('nome').value;
    var sobrenome = document.getElementById('sobrenome').value;
    var cpf = document.getElementById('cpf').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;

    db.transaction(function(sql) {
        if(id) {
            sql.executeSql('UPDATE myTable SET nome=?, sobrenome=?, cpf=?, email=?, telefone=? WHERE id=?', [nome, sobrenome, cpf, email, telefone], null);
        } else {
            sql.executeSql('INSERT INTO myTable (nome, sobrenome, cpf, email, telefone) VALUES (?, ?, ?, ?, ?)', [nome, sobrenome, cpf, email, telefone]);
        }
    });

    listar_contatos();
    inputSHOW(false);
}

function listar_contatos(){        
    var table = document.getElementById('tabela-contatos');

    db.transaction(function(sql) {
        tx.executeSql('SELECT * FROM myTable', [], function (sql, resultado) {
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

function atualizar(_id){   
    
    var id = document.getElementById('id');
    var nome = document.getElementById('nome');
    var sobrenome = document.getElementById('sobrenome');
    var cpf = document.getElementById('cpf');
    var email = document.getElementById('email');
    var telefone = document.getElementById('telefone');
    
    id.value = _id;
    
    db.transaction(function(sql) {
        sql.executeSql('SELECT * FROM myTable WHERE id=?', [_id], function (sql, resultado) {
            var rows = resultado.rows[0];

            nome.value = rows.nome;
            sobrenome.value = rows.sobrenome;
            cpf.value = rows.cpf;
            email.value = rows.email;
            telefone.value = rows.telefone;
        });
    });
    inputSHOW(true);
}

