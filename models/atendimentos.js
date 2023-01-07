const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Atendimento {
    adiciona(at, res) {
        const dataCriacao = moment().utcOffset(9).format('YYYY-MM-DD hh:mm:ss')
        const data = moment(at.data, 'DD/MM/YYYY').utcOffset("+09:00").format('YYYY-MM-DD hh:mm:ss')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = at.cliente.length >= 5

        const validacoes = [
            {
                nome : 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser igual ou maior que a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ser pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)

            return
        }

        const atDatado = {...at, dataCriacao, data}

        const sql = 'INSERT INTO atendimentos SET ?'

        conexao.query(sql, atDatado, (erro, result) => {
            if (erro) {
                res.status(400).json(erro)

                return
            }

            const id = result.insertId
            
            res.status(201).json({...at, id})
        })
    }

    lista(res) {
        const sql = 'SELECT * FROM atendimentos'

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro)

                return 
            }

            res.status(200).json(result)
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, result) => {
            if (erro) {
                res.status(400).json(erro)
            }

            const atendimento = result[0]

            res.status(200).json(atendimento)
        })
    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss')
        }

        const sql = 'UPDATE atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, result) => {
            if (erro) {
                res.status(400).json(erro)

                return
            }

            res.status(200).json({...valores, id})
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, result) => {
            if (erro) {
                res.status(400).json(erro)

                return
            }

            res.status(200).json({id})
        })
    }
}

module.exports = new Atendimento
