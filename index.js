const express = require('express');
const path = require('path');
const sqlite = require('sqlite3').verbose();


const app = express();

app.use(express.json());


const db = new sqlite.Database("Cadastro.sqlite");

app.use(express.static(path.join(__dirname, "public")));



function Criar_tabela() {
    var query = 'CREATE TABLE IF NOT EXISTS CLIENTES(';
    query += 'ID INTEGER PRIMARY KEY AUTOINCREMENT,';
    query += 'CPF INT,';
    query += 'NUMERO INT,';
    query += 'IDADE INT,';
    query += 'ENDERECO VARCHAR(60))';

    db.run(query, (err) => {
        if (err) console.log(err);
        else console.log('Tabela Criada com Sucesso!');
    });
}




//Criar_tabela()



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/public/login.html"));
});





app.post('/addcliente', function (req, res) {

    console.log(req.body);

    var cpf = req.body.cpf;
    var numero = req.body.numero;
    var idade = req.body.idade;
    var endereco = req.body.endereco;

    var sql = 'INSERT INTO CLIENTES (CPF, NUMERO, IDADE, ENDERECO) VALUES (?, ?, ?, ?)';

    db.run(sql, [cpf, numero, idade, endereco], (err) => {
        if (err) res.send(err);
        else res.send('Dados Inseridos com Sucesso!');
    });
});








app.get("/consultar/:buscar", (req, res) => {
    const cpf = req.params.buscar;

    var sql = "SELECT * FROM CLIENTES WHERE CPF = ?";

    db.all(sql, [cpf], (err, rows) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            return res.status(500).send('Erro ao consultar os clientes.');
        }
        if (rows.length === 0) {
            return res.status(404).send('cliente não encontrado.');
        }

        res.json(rows);
    });
});













app.post('/validarlogin', function (req, res) {
    
    console.log(req.body);

    var usuario = req.body.usuario
    var senha = req.body.senha

    if (usuario == 'rh' && senha == '2024') res.send('principal.html')
    else res.send('/')
})






app.listen(3000, console.log("Rodando... http://localhost:3000"));
