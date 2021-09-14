import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Endpoint Routes
  Route.resource('/endpoints', 'EndpointsController')
    .except(['create', 'show', 'edit'])
    .as('endpoint')

  Route.get('/endpoints/show/:data', 'EndpointsController.show').as(
    'endpoint.show'
  )

  Route.resource('/branches', 'BranchesController')
    .except(['create', 'show', 'edit'])
    .as('branches')

  Route.get('/branches/show/:data', 'BranchesController.show').as('branch.show')

  // Auth Routes
  Route.resource('auths', 'AuthsController')
    .except(['create', 'show', 'edit'])
    .as('auths')

  Route.get('/auths/show/:data', 'AuthsController.show').as('auth.show')

  // Aor Routes
  Route.resource('aors', 'AorsController')
    .except(['create', 'show', 'edit'])
    .as('aors')

  Route.get('/aors/show/:data', 'AorsController.show').as('aors.show')

  // Extension Routes
  Route.resource('extensions', 'ExtensionsController')
    .except(['create', 'show', 'edit'])
    .as('extensions')

  Route.get('/extensions/show/:data', 'ExtensionsController.show').as(
    'extension.show'
  )

  //Iax Routes
  Route.resource('iaxs', 'IaxsController')
    .except(['create', 'show', 'edit'])
    .as('iaxs')

  // Queue Routes
  Route.group(() => {
    Route.resource('', 'QueuesController')
      .only(['index', 'store', 'destroy'])
      .as('queues')

    Route.put('/:name', 'QueuesController.update').as('queue.update')

    Route.delete('/delete/:name', 'QueuesController.destroy').as('queue.delete')

    Route.get('/show/:data', 'QueuesController.show').as('queues.show')
  }).prefix('/queues')

  // Queue Members
  Route.group(() => {
    Route.get('/', 'QueueMembersController.index').as('queuemembers.index')

    Route.get('show/:data', 'QueueMembersController.show').as(
      'queuemembers.show'
    )

    Route.post('', 'QueueMembersController.store').as('queuemembers.store')

    Route.delete('/:interface', 'QueueMembersController.destroy').as(
      'queuemembers.destroy'
    )

    Route.put('/:interface', 'QueueMembersController.update').as(
      'queuemembers.update'
    )
  }).prefix('/queuemembers')
}).prefix('/api')
