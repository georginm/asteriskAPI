import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'
import PaginateValidator from 'App/Validators/PaginateValidator'

export default class UsersController {
  public async show({ response, request }: HttpContextContract) {
    await request.validate(PaginateValidator)

    const { limit = 10, page = 1, filter } = request.all()
    const data = await new UserService().show(page, limit, filter)

    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await new UserService().create(request.body())
    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await new UserService().update(request.body(), id)

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await new UserService().destroy(request.params().id)

    return response.ok({ message: 'User Has Been Deleted' })
  }

  public async index({ request, response }: HttpContextContract) {
    await request.validate(PaginateValidator)

    const data = await new UserService().index(request.qs().id)

    return response.ok(data)
  }
}
