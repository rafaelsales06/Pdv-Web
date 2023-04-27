const { request } = require('express');
const Produtos = require('../models/ProdutosData');

module.exports = {
    async update(req,res){
        const { id } = req.params;
        const {name,apelido,codigo,p_compra,p_venda} = req.body;
        
        const produtos = await Produtos.findOne({ _id : id });

        if(!name || !p_venda){
            return res.status(401).json({error: "Os campos de Nome e Preço de venda precisam estar preenchidos"})
        }

        else{
            produtos.name = name;
            produtos.apelido = apelido;
            produtos.codigo = codigo;
            produtos.p_compra = p_compra;
            produtos.p_venda = p_venda;

            await produtos.save()
        }

        return res.json(produtos);
    }
}
