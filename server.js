// Setup da aplicação

//chamada dos pacotes
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

//Configuração da variável app para usar o body-parser
app.use(bodyParser.urlencoded({extend: true}))
app.use(bodyParser.json())

//Definido porta para a execuçao da api
var port = process.env.port || 8000

//Criando uma instancia das rotas via express
var router = express.Router()

//Rota de exemplo
router.get('/', function(req, res){
    res.json({message:  "Bem vindo"})
})

//Definido o padrão das rota prefixxadas com '/api'
app.use('/api', router)

//Iniciando o servidor:
app.listen(port)
console.log("Iniciando a app na porta: " + port)