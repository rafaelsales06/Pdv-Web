const mongoose = require('mongoose');

const ProdutosDataSchema = new mongoose.Schema({
    name: String,
    apelido: String,
    codigo: Number,
    p_compra: Number,
    p_venda: Number,
});

module.exports = mongoose.model('Produtos', ProdutosDataSchema)