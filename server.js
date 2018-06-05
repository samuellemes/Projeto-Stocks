// Setup da aplicação

//chamada dos pacotes
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongooge = require('mongoose')
var Produto = require('./app/models/produto')

//URI: MLab
mongooge.connect('mongodb://node-api:samuel123@ds247690.mlab.com:47690/node-api')

//Configuração da variável app para usar o body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Definido porta para a execuçao da api
var port = process.env.port || 8000

//---------------------------------------ROTAS--------------------------------------------------------

//Criando uma instancia das rotas via express
var router = express.Router()

router.use(function(req, res, next) {
    console.log("Algo aqui")
    next()
})

//Rota de exemplo
router.get('/', function(req, res){
    res.json({message:  "Bem vindo"})
})


// -----------------------------------------------APIS----------------------------------------------------

//Rota produtos: Utilizada para GET e POST
router.route('/produtos')

    //  Método criar:
    .post(function(req, res) {
        var produto = new Produto()

        //Setar campos do produto
        produto.nome = req.body.nome
        produto.marca = req.body.marca
        produto.tipo  = req.body.tipo
        produto.preco = req.body.preco
        produto.quantidade = req.body.quantidade
        produto.descricao = req.body.descricao

        produto.save(function(err) {
            if(err) {
                res.send('Erro ao tentar salvar produto.' + err)
            }
            res.json({message: 'Produto cadastrado com sucesso!'})
        })
    })

    //Rota produtos: Utilizada para selecionar todos os produtos GET
    .get(function(req, res) {
        Produto.find(function(err, produtos) {
            if(err) {
                res.send('Erro ao tentar selecionar todos os produtos: ' + err)
            }
            res.json(produtos)
        })
    })

    //Rota produtos/:produto_id (GET POST & DELETE)
    router.route('/produtos/:produto_id')
    
    //Selecionar por id (GET)
    .get(function(req, res) {
        Produto.findById(req.params.produto_id, function(err, produto) {
            if(err) {
                res.send('Id do produto não encontrado: ' + err)
            }
            res.json(produto)
        })
    })

    //Rota produtos/:produto_id  Atualizar por id (PUT)
    .put(function(req, res) {
        Produto.findById(req.params.produto_id, function(err, produto) {
            if(err) {
                res.send('Id do produto não encontrado: ' + err)
            }

            produto.nome = req.body.nome
            produto.marca = req.body.marca
            produto.tipo  = req.body.tipo
            produto.preco = req.body.preco
            produto.quantidade = req.body.quantidade
            produto.descricao = req.body    .descricao

            produto.save(function(err) {
                if(err) {
                    res.send('Erro ao atualizar o produto: ' + err)
                }
                res.send({message: 'Produto atualizado com sucesso!'})
            })
        })
    })
    
    //Rota produtos/:produto_id  deletar por id (DELETE)
    .delete(function(req, res) {
        Produto.remove({
            _id: req.params.produto_id
            },function(err) {
                if(err) {
                    res.send('Id do produto não encontrado: ' + err)
                }
                res.json({message: 'Produto excluído com sucesso'})
            }
        )
    })

//Definido o padrão das rota prefixxadas com '/api'
app.use('/api', router)

//Iniciando o servidor:
app.listen(port)
console.log("Iniciando a app na porta: " + port)