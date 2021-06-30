import Route from '@ioc:Adonis/Core/Route'
import AorsController from 'App/Controllers/Http/AorsController'
import AuthController from 'App/Controllers/Http/AuthsController'
import EndpointsController from 'App/Controllers/Http/EndpointsController'
import ExtensionsController from 'App/Controllers/Http/ExtensionsController'
import QueueMembersController from 'App/Controllers/Http/QueueMembersController'
import QueuesController from 'App/Controllers/Http/QueuesController'

const endpointController = new EndpointsController()
const authController = new AuthController()
const aorController = new AorsController()
const extensionController = new ExtensionsController()
const queueController = new QueuesController()
const queueMembersController = new QueueMembersController()

Route.get('/', async () => {
  return { hello: 'world' }
})

// Route.group(() => {})

Route.get('/endpoint', endpointController.index)
Route.post('/endpoint', endpointController.store)
Route.put('/endpoint/:id', endpointController.update)
Route.delete('/endpoint/:id', endpointController.delete)
Route.get('/endpoint/:id', endpointController.list)

Route.get('/auth', authController.index)
Route.post('/auth', authController.store)
Route.put('/auth/:id', authController.update)
Route.delete('/auth/:id', authController.delete)
Route.get('/auth/:id', authController.list)

Route.get('/aors', aorController.index)
Route.post('/aors', aorController.store)
Route.put('/aors/:id', aorController.update)
Route.delete('/aors/:id', aorController.delete)
Route.get('/aors/:id', aorController.list)

Route.get('/extensions', extensionController.index)
Route.post('/extensions', extensionController.store)
Route.put('/extensions/:id', extensionController.update)
Route.delete('/extensions/:id', extensionController.delete)
Route.get('/extensions/:id', extensionController.list)

Route.get('/queues/deleted', queueController.listDeleted)
Route.get('/queues', queueController.index)
Route.post('/queues', queueController.store)
Route.post('/queues/:name', queueController.activate)
Route.put('/queues/:name', queueController.update)
Route.delete('/queues/:name', queueController.softdelete)
Route.delete('/queues/delete/:name', queueController.delete)
Route.get('/queues/list/:name', queueController.list)

Route.get('/queuemembers', queueMembersController.index)
Route.get('/queuemembers/list/:protocol/:endpoint', queueMembersController.list)
Route.post('/queuemembers', queueMembersController.store)
Route.put('/queuemembers/:protocol/:endpoint', queueMembersController.update)
Route.delete('/queuemembers/:protocol/:endpoint', queueMembersController.delete)
