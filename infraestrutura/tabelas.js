class Tabelas {
    init (cn) {
        this.cn = cn

        this.criarAtendimentos()
    }

    criarAtendimentos() {
        let sql = 'CREATE TABLE IF NOT EXISTS atendimentos ' 
        sql = sql + '('
        sql = sql + 'id int NOT NULL AUTO_INCREMENT, '
        sql = sql + 'cliente varchar(50) NOT NULL, '
        sql = sql + 'pet varchar(20), '
        sql = sql + 'servico varchar(20) NOT NULL, '
        sql = sql + 'status varchar(20) NOT NULL, '
        sql = sql + 'data datetime NOT NULL, '
        sql = sql + 'dataCriacao datetime NOT NULL, '
        sql = sql + 'observacoes text, '
        sql = sql + 'PRIMARY KEY(id)'
        sql = sql + ')'

        this.cn.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            } else {
                console.log('Tabela de atendimentos criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas
