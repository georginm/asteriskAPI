import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Endpoint Routes
  Route.resource('/endpoints', 'EndpointsController')
    .except(['create', 'edit'])
    .as('endpoint')

  Route.resource('/branches', 'BranchesController')
    .except(['create', 'edit'])
    .as('branches')

  // Auth Routes
  Route.resource('auths', 'AuthsController')
    .except(['create', 'edit'])
    .as('auths')

  // Aor Routes
  Route.resource('aors', 'AorsController').except(['create', 'edit']).as('aors')

  // Extension Routes
  Route.resource('extensions', 'ExtensionsController')
    .except(['create', 'edit'])
    .as('extensions')

  //Iax Routes
  Route.resource('iaxs', 'IaxsController').except(['create', 'edit']).as('iaxs')

  // Queue Routes
  Route.resource('/queues', 'QueuesController')
    .except(['create', 'edit'])
    .as('queues')

  // Queue Members
  Route.resource('/queuemembers', 'QueueMembersController')
    .except(['edit', 'create'])
    .as('queuemembers')

  // Transport Routes
  Route.resource('/transports', 'TransportsController')
    .except(['create', 'edit'])
    .as('transport')

  // MusiconHold Routes
  Route.resource('/musiconholds', 'MusicOnHoldsController')
    .except(['create', 'edit'])
    .as('musiconhold')

  // Registration Routes
  Route.resource('/registrations', 'RegistrationsController')
    .except(['create', 'edit'])
    .as('registration')

  // Users
  Route.resource('/users', 'UsersController')
    .except(['create', 'edit', 'store'])
    .as('user')

  Route.get('/sessions', 'SessionsController.logout').as('session.logout')
})
  .prefix('/api')
  .middleware('auth')

Route.group(() => {
  // Create User Route
  Route.post('/users/store', 'UsersController.store').as('user.store')

  // Session
  Route.post('/sessions', 'SessionsController.store').as('session.store')
}).prefix('/api')
