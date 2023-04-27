const express = require('express');

const routes = express.Router();

const ProdutosController = require('./controllers/ProdutosController');
const ContentController = require('./controllers/ContentController');

const VendasController = require('./controllers/VendasController');

// Rota Produtos
routes.post('/produtos', ProdutosController.create);
routes.get('/produtos', ProdutosController.read);
routes.delete('/produtos/:id', ProdutosController.delete);

// Rota para mudar as informações dos produtos
routes.post('/produtos/:id', ContentController.update);

// Rota Vendas
routes.post('/vendas', VendasController.create);
routes.get('/vendas', VendasController.read);
routes.delete('/vendas/:id', VendasController.delete);

module.exports = routes;