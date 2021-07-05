import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  // Endpoint Routes
  Route.resource('/endpoints', 'EndpointsController')
    .except(['create', 'show', 'edit'])
    .as('endpoint')

  Route.get('/endpoints/list/', 'EndpointsController.list').as(
    'endpoint.list'
  )

  // Auth Routes
  Route.resource('auths', 'AuthsController')
    .except(['create', 'show', 'edit'])
    .as('auths')

  Route.get('/auths/list/', 'AuthsController.list').as('auth.list')

  // Aor Routes
  Route.resource('aors', 'AorsController')
    .except(['create', 'show', 'edit'])
    .as('aors')

  // Extension Routes
  Route.resource('extensions', 'ExtensionsController')
    .except(['create', 'show', 'edit'])
    .as('extensions')

  //Iax Routes
  Route.resource('iaxs', 'IaxController')
    .except(['create', 'show', 'edit'])
    .as('iaxs')

  // Queue Routes
  Route.resource('queues', 'QueuesController')
    .except(['create', 'show', 'edit'])
    .as('queues')

  Route.get('/queues/deleted', 'QueuesController.listDeleted').as(
    'queues.listDeleted'
  )

  Route.post('/queues/:name', 'QueuesController.activate').as(
    'queues.activate'
  )

  Route.delete('/queues/:name', 'QueuesController.softdelete').as(
    'queues.softdelete'
  )

  // Queue Members
  Route.group(() => {
    Route.get('/', 'QueueMembersController.index').as(
      'queuemembers.index'
    )

    Route.get('list/', 'QueueMembersController.list').as(
      'queuemembers.list'
    )

    Route.post('', 'QueueMembersController.store').as(
      'queuemembers.store'
    )

    Route.delete('/:uniqueid', 'QueueMembersController.destroy').as(
      'queuemembers.destroy'
    )
  }).prefix('/queuemembers')

  // Colocar status 404
  Route.get('*', () => {
    return { message: 'Not Found' }
  })
}).prefix('/api')
