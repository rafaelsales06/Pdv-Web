const { request } = require('express');
const Produtos = require('../models/ProdutosData');

module.exports = {

    async read(req,res){
        const ProdutosList = await Produtos.find();
        return res.json(ProdutosList);
    },

    async create(req,res){
        const {name,apelido,codigo,p_compra,p_venda} = req.body;

        if(!name || !p_venda){
            return res.status(400).json({error: "Necessario um nome e preço de venda"});
        }

        const produtosCreated = await Produtos.create({
            name,
            apelido,
            codigo,
            p_compra,
            p_venda
        });
        
        return res.json(produtosCreated)
    },


    async delete(req,res){
        const { id } = req.params;

        const produtosDeleted = await Produtos.findOneAndRemove({ _id : id })
        
        if(produtosDeleted){
            return res.json(produtosDeleted)
        }

        return res.status(401).json({erro : "Produto não encontrado"})
    }
}