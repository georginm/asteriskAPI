import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Auth from 'App/Models/Auth'
import AuthServices from 'App/Services/AuthServices'
import {
  CreateAuthValidator,
  DeleteAuthValidator,
  ListAuthValidator,
  UpdateAuthValidator,
} from 'App/Validators/Auth'

export default class AuthController {
  public async index({ response }: HttpContextContract) {
    const data = await Auth.all()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateAuthValidator)

    const data = await new AuthServices().create(request.body())

    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateAuthValidator)

    const data = await new AuthServices().update(
      request.body(),
      request.params().id
    )

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteAuthValidator)

    await new AuthServices().destroy(request.params().id)

    return response.ok({ message: 'Auth has been deleted.' })
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListAuthValidator)

    const data = await new AuthServices().show(request.params().data)

    return response.ok(data)
  }
}
