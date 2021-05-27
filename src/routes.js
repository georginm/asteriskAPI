const { Router } = require('express');
const queuesControllers = require('./controllers/queuesControllers');

const routes = new Router();

routes.get('/', (req,res) => {
    res.send('Hello World');
});

routes.get('/queues', queuesControllers.index);
routes.post('/queues/store', queuesControllers.store);
routes.delete('/queues/:name', queuesControllers.delete);
routes.put('/queue/:name', queuesControllers.update);


module.exports = routes;