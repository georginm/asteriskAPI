import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Auth from 'App/Models/Auth'

export default class AuthController {
  public async index({ response }: HttpContextContract) {
    const data = await Auth.all()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { username, id } = request.body()

    const requireFields = ['id', 'username', 'auth_type', 'password']

    for (const field of requireFields) {
      if (!request.body()[field]) {
        return response.badRequest({ message: `${field} was not provided` })
      }
    }

    const idAlreadyExists = await Auth.find(id)

    if (idAlreadyExists) {
      return response.badRequest({ message: 'auth id already exists' })
    }

    const userNameExists = await Auth.findBy('username', username)

    if (userNameExists) {
      return response.badRequest({ message: 'auth username already exists' })
    }

    const data = await Auth.create(request.body())

    return response.created(data)
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
