const mongoose = require('mongoose');

const VendasDataSchema = new mongoose.Schema({
    created_at: Object,
    produtos: Array,
    pagamentos: Array,
});

module.exports = mongoose.model('Vendas', VendasDataSchema)