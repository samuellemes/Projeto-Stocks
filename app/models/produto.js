//Modelo da classe produto

var mongoose = require('mongoose')
var schema = mongoose.Schema

//Produto
var produtoSchema = new schema({
    nome: String,
    preco: Number,
    descricao: String
})

module.exports = mongoose.model('produto', produtoSchema)