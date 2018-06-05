//Modelo da classe produto

var mongoose = require('mongoose')
var schema = mongoose.Schema

//Produto
var produtoSchema = new schema({
    nome: String,
    marca: String,
    tipo: String,
    preco: Number,
    quantidade: Number,
    descricao: String
})

module.exports = mongoose.model('produto', produtoSchema)