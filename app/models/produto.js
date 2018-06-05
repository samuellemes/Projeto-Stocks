//Modelo da classe produto

var mongoose = require('mongoose')
var Schema = mongoose.Schema

//Produto
var produtoSchema = new Schema({
    nome: String,
    preco: Number,
    descricao: String
})

module.exports = mongoose.model('Produto', produtoSchema)