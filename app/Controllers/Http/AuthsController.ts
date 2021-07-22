import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Auth from 'App/Models/Auth'
import CreateAuthValidator from 'App/Validators/Auth/CreateAuthValidator'

export default class AuthController {
  public async index({ response }: HttpContextContract) {
    const data = await Auth.all()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const validator = await request.validate(CreateAuthValidator)

      const data = await Auth.create(validator)

      return response.created(data)
    } catch (error) {
      return response.badRequest(error.messages.errors)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const { username } = request.body()

    if (username) {
      const userNameAlreadyExists = await Auth.findBy('username', username)
      if (userNameAlreadyExists) {
        return response.badRequest({
          message: 'username provided already exists',
        })
      }
    }

    const data = await Auth.find(id)

    if (!data) {
      return response.badRequest({ message: 'auth not exists' })
    }

    data.merge(request.body())

    await data.save()

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Auth.find(id)

    if (!data) {
      return response.badRequest({ message: 'auth not exists' })
    }

    await data.delete()

    return response.ok({ message: 'auth has been deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const where = request.qs()
    const data = await Auth.query().where(where)
    if (!data.length) {
      return response.badRequest({ message: 'Auth Not Exists' })
    }

    return response.ok(data)
  }
}
