const { Router } = require('express');

const queuesControllers = require('./controllers/queueControllers');
const queueMemberControllers = require('./controllers/queueMemberControllers');
const brancheControllers = require('./controllers/brancheControllers');
const aorsControllers = require('./controllers/aorControllers');
const endpointsController = require('./controllers/endpointController');
const authControllers = require('./controllers/authControllers');
const extensionsControllers = require('./controllers/extensionControllers');

const routes = new Router();

routes.get('/', brancheControllers.index);
routes.get('/branches/list', brancheControllers.list);
routes.delete('/branches/:id', brancheControllers.delete);


routes.get('/queues', queuesControllers.index);
routes.get('/queues/list', queuesControllers.list);
routes.post('/queues/create', queuesControllers.create);
routes.delete('/queues/:name', queuesControllers.delete);
routes.put('/queues/:name', queuesControllers.update);


routes.get('/queuemembers', queueMemberControllers.index);
routes.post('/queuemembers/create', queueMemberControllers.create);
routes.put('/queuemembers/:protocol/:branche', queueMemberControllers.update);
routes.delete('/queuemembers/:protocol/:branche', queueMemberControllers.delete);

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

routes.get('/extensions', extensionsControllers.index);
routes.post('/extensions/create', extensionsControllers.create);
routes.delete('/extensions/:id', extensionsControllers.delete);
routes.put('/extensions/:id', extensionsControllers.update);

module.exports = routes;