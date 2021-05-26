const { Router } = require('express');
const queuesControllers = require('./controllers/queuesControllers');

const routes = new Router();

routes.get('/', (req,res) => {
    res.send('Hello World');
});

routes.get('/queues/list', queuesControllers.list);

module.exports = routes;