import Route from '@ioc:Adonis/Core/Route'
import AorsController from 'App/Controllers/Http/AorsController'
import AuthController from 'App/Controllers/Http/AuthController'
import EndpointsController from 'App/Controllers/Http/EndpointsController'

const endpointController = new EndpointsController()
const authController = new AuthController()
const aorController = new AorsController()

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
