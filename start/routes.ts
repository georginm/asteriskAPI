import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.group(() => {
  // Endpoint Routes
  Route.resource('/endpoints', 'EndpointsController')
    .except(['create', 'show', 'edit'])
    .as('endpoint');

  // Auth Routes
  Route.resource('auths', 'AuthsController')
    .except(['create', 'show', 'edit'])
    .as('auths');

  // Aor Routes
  Route.resource('aors', 'AorsController')
    .except(['create', 'show', 'edit'])
    .as('aors');

  // Extension Routes
  Route.resource('extensions', 'ExtensionsController')
    .except(['create', 'show', 'edit'])
    .as('extensions');

  //Iax Routes
  Route.resource('iaxs', 'IaxController')
    .except(['create', 'show', 'edit'])
    .as('iaxs');

  // Queue Routes
  Route.resource('queues', 'QueuesController')
    .except(['create', 'show', 'edit'])
    .as('queues');

  Route.get('/queues/deleted', 'QueuesController.listDeleted').as(
    'queues.listDeleted'
  );

  Route.post('/queues/:name', 'QueuesController.activate').as(
    'queues.activate'
  );

  Route.delete('/queues/:name', 'QueuesController.softdelete').as(
    'queues.softdelete'
  );

  // Queue Members
  Route.get('/queuemembers', 'QueueMembersController.index').as(
    'queuemembers.index'
  );

  Route.get(
    '/queuemembers/list/:protocol/:endpoint',
    'QueueMembersController.list'
  ).as('queuemembers.list');

  Route.post('/queuemembers', 'QueueMembersController.store').as(
    'queuemembers.store'
  );

  Route.put(
    '/queuemembers/:protocol/:endpoint',
    'QueueMembersController.update'
  ).as('queuemembers.update');

  Route.delete(
    '/queuemembers/:protocol/:endpoint',
    'QueueMembersController.destroy'
  ).as('queuemembers.destroy');

  Route.get('*', 'teste');
}).prefix('/api');
