const mysql = require('mysql2') 

const conexao = mysql.createConnection({
    host: 'meu_mysql', // nosso container de banco de dados em rede
    port: 3306,
    user: 'root',
    password: 'flaviocardoso',
    database: 'agenda_petshop'
})

module.exports = conexao