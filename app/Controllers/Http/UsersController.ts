import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'

export default class UsersController {
  public async index({ response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const data = await new UserService().index()

    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await new UserService().create(request.body())
    return response.created(data)
  }

  public async update({ request, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const { id } = request.params()
    const data = await new UserService().update(request.body(), id)

    return response.ok(data)
  }

  public async destroy({ request, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    await new UserService().destroy(request.params().id)

    return response.ok({ message: 'User Has Been Deleted' })
  }

  public async show({ request, response, auth }: HttpContextContract) {
    await auth.use('api').authenticate()

    const data = await new UserService().show(request.params().data)

    return response.ok(data)
  }
}
