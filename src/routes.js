const { Router } = require('express');
const queuesControllers = require('./controllers/queuesControllers');
const queueMemberControllers = require('./controllers/queueMemberControllers');

const routes = new Router();

routes.get('/', (req,res) => {
    res.send('Hello World');
});

routes.get('/queues', queuesControllers.index);
routes.get('/queues/list', queuesControllers.list);
routes.post('/queues/create', queuesControllers.create);
routes.delete('/queues/:name', queuesControllers.delete);
routes.put('/queues/:name', queuesControllers.update);


routes.get('/queuemembers', queueMemberControllers.index);
routes.post('/queuemembers/create', queueMemberControllers.create);
routes.put('/queuemembers/:protocol/:ramal', queueMemberControllers.update);
routes.delete('/queuemembers/:protocol/:ramal', queueMemberControllers.delete);

module.exports = routes;