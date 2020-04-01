const {Router} = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// métodos http - get, post, put, delete
/*
tipos de parâmetros:

query params : usado quase 90% das vezes no metodo get | são visíveis na url
 req.query(filtros, ordenação, paginação)

route params : usado muito nos metodos put e delete | para 1 item
 req.params(identificar um recurso na alteração ou remoção)

body params  : mais usado nos métodos post e put
 req.body(dados p/ criação ou alteração de um registro)
*/

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;