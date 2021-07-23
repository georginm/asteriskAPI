import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Auth from 'App/Models/Auth'
import CreateAuthValidator from 'App/Validators/Auth/CreateAuthValidator'
import ListAuthValidator from 'App/Validators/Auth/ListAuthValidator'
import UpdateAuthValidator from 'App/Validators/Auth/UpdateAuthValidator'

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
    try {
      const { params, ...validator } = await request.validate(
        UpdateAuthValidator
      )

      const data = await Auth.find(params.id)
      if (!data) {
        return response.badRequest({ message: 'Internal Server Error' })
      }

      data.merge(validator)
      await data.save()

      return response.ok(data)
    } catch (error) {
      return response.badRequest(error.messages.errors)
    }
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
    try {
      const where = await request.validate(ListAuthValidator)
      const data = await Auth.query().where(where)
      if (!data.length) {
        return response.badRequest({ message: 'Auth Not Exists' })
      }

      return response.ok(data)
    } catch (error) {
      return response.badRequest(error.messages.errors)
    }
  }
}
