const {Router} = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;

/*definindo caminho *//*Demais metodos HTTP : get, post, put, delete*/ 

//Tipos de parâmetros :

//Query Params: request.query (filtros, paginacao, ordenacao)
//Route Params: request.params(Identificar um recurso na alteracao ou remocao)
//Body: request.body (dados para criacao ou alterecao de um registro)