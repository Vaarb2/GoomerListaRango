const express = require('express');
const router = express.Router();

const RestauranteController = require('./controllers/RestauranteController');

router.get('/restaurantes', RestauranteController.buscarTodos); // rota para listar todos os restaurantes
router.get('/restaurantes/:id', RestauranteController.buscarPorId); // rota para buscar restaurante por ID
router.post('/restaurantes', RestauranteController.cadastrarRestaurante); // rota para cadastrar um novo restaurante
router.put('/restaurantes/:id', RestauranteController.atualizarRestaurante); // rota para atualizar informações do restaurante
router.delete('/restaurantes/:id', RestauranteController.excluirRestaurante); // rota para excluir um restaurante e seus dados
router.get('/restaurantes/:id/produtos', RestauranteController.listarProdutosPorRestaurante); // rota para listar todos os produtos de um restaurante
router.post('/restaurantes/:id/produtos', RestauranteController.criarProdutoParaRestaurante); // rota para criar um produto para um restaurante
router.put('/restaurantes/:idRestaurante/produtos/:idProduto', RestauranteController.atualizarProdutoDeRestaurante); //  rota para atualizar um produto de um restaurante
router.delete('/restaurantes/:idRestaurante/produtos/:idProduto', RestauranteController.excluirProdutoDeRestaurante); //  rota para excluir um produto de um restaurante
router.post('/produtos/:idProduto/promocoes', RestauranteController.criarPromocaoParaProduto); // rota para criar promoçao de um produto

module.exports = router;