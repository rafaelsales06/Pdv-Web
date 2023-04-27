const { request } = require('express');
const Vendas = require('../models/VendasData');

module.exports = {

    async read(req,res){
        const VendasList = await Vendas.find();
        console.log(VendasList)
        return res.json(VendasList);
    },

    async create(req,res){
        const {produtos,pagamentos} = req.body;
        const date = new Date();
        console.log(date.getFullYear())

        if(!produtos || !pagamentos){
            return res.status(400).json({error: "Necessario um produto ou metodos de pagamentos"});
        }

        

        const VendasCreated = await Vendas.create({
            created_at: { dia: date.getDate(), mes: (date.getMonth() + 1), ano: date.getFullYear(), hora: `${date.getHours()}:${date.getMinutes()}`},
            produtos: produtos,
            pagamentos: pagamentos
        });
        
        return res.json(VendasCreated)
    },

    async delete(req,res){
        const { id } = req.params;

        const VendasDeleted = await Vendas.findOneAndRemove({ _id : id })
        
        if(VendasDeleted){
            return res.json(VendasDeleted)
        }

        return res.status(401).json({erro : "Venda não encontrada"})
    }
}