const { Router } = require('express');

const queuesControllers = require('./controllers/queuesControllers');
const queueMemberControllers = require('./controllers/queueMemberControllers');
const ramalControllers = require('./controllers/ramalControllers');
const aorsControllers = require('./controllers/aorsControllers');
const endpointsController = require('./controllers/endpointsController');
const authControllers = require('./controllers/authControllers');

const routes = new Router();

routes.get('/', ramalControllers.index);
routes.get('/ramais', ramalControllers.list);


routes.get('/queues', queuesControllers.index);
routes.get('/queues/list', queuesControllers.list);
routes.post('/queues/create', queuesControllers.create);
routes.delete('/queues/:name', queuesControllers.delete);
routes.put('/queues/:name', queuesControllers.update);


routes.get('/queuemembers', queueMemberControllers.index);
routes.post('/queuemembers/create', queueMemberControllers.create);
routes.put('/queuemembers/:protocol/:ramal', queueMemberControllers.update);
routes.delete('/queuemembers/:protocol/:ramal', queueMemberControllers.delete);

routes.get('/ramais', ramalControllers.index);
routes.get('/ramais/list', ramalControllers.list);

routes.get('/aors', aorsControllers.index);
routes.get('/aors/list', aorsControllers.list);
routes.post('/aors/create', aorsControllers.create);
routes.delete('/aors/:id', aorsControllers.delete);
routes.put('/aors/:id', aorsControllers.update);

routes.get('/endpoint', endpointsController.index);
routes.get('/endpoint/list', endpointsController.list);
routes.post('/endpoint/create', endpointsController.create);
routes.put('/endpoint/:id', endpointsController.update);
routes.delete('/endpoint/:id', endpointsController.delete);

routes.get('/auth', authControllers.index);
routes.get('/auth/list', authControllers.list);
routes.post('/auth/create', authControllers.create);
routes.delete('/auth/:id', authControllers.delete);
routes.put('/auth/:id', authControllers.update);

module.exports = routes;