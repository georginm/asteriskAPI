import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  // Endpoint Routes
  Route.resource('/endpoints', 'EndpointsController')
    .except(['create', 'show', 'edit'])
    .as('endpoint')

  Route.get('/endpoints/list/', 'EndpointsController.list').as('endpoint.list')

  // Auth Routes
  Route.resource('auths', 'AuthsController')
    .except(['create', 'show', 'edit'])
    .as('auths')

  Route.get('/auths/list/', 'AuthsController.list').as('auth.list')

  // Aor Routes
  Route.resource('aors', 'AorsController')
    .except(['create', 'show', 'edit'])
    .as('aors')

  Route.get('/aors/list/', 'AorsController.list').as('aors.list')

  // Extension Routes
  Route.resource('extensions', 'ExtensionsController')
    .except(['create', 'show', 'edit'])
    .as('extensions')

  //Iax Routes
  Route.resource('iaxs', 'IaxController')
    .except(['create', 'show', 'edit'])
    .as('iaxs')

  // Queue Routes
  Route.group(() => {
    Route.resource('', 'QueuesController')
      .only(['index', 'destroy'])
      .as('queues')

    Route.put('/:name', 'QueuesController.update').as('queue.update')

    Route.delete('/delete/:name', 'QueuesController.destroy').as('queue.delete')

    Route.get('/deleted', 'QueuesController.listDeleted').as(
      'queues.listDeleted'
    )

    Route.get('/list', 'QueuesController.list').as('queues.list')

    Route.post('/:name', 'QueuesController.activate').as('queues.activate')

    Route.delete('/:name', 'QueuesController.softdelete').as(
      'queues.softdelete'
    )
  }).prefix('/queues')

  // Queue Members
  Route.group(() => {
    Route.get('/', 'QueueMembersController.index').as('queuemembers.index')

    Route.get('list/', 'QueueMembersController.list').as('queuemembers.list')

    Route.post('', 'QueueMembersController.store').as('queuemembers.store')

    Route.delete('/:uniqueid', 'QueueMembersController.destroy').as(
      'queuemembers.destroy'
    )
  }).prefix('/queuemembers')

  // Colocar status 404
  Route.get('*', ({ response }: HttpContextContract) => {
    return response.status(404).send({ message: 'Route Not Found' })
  })

  Route.post('*', ({ response }: HttpContextContract) => {
    return response.status(404).send({ message: 'Route Not Found' })
  })
}).prefix('/api')
