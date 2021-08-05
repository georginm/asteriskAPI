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
    try {
      await request.validate(CreateAuthValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const data = await new AuthServices().create(request.body())

      return response.created(data)
    } catch (error) {
      if (error.status === 400) {
        return response.badRequest({ message: error.message })
      }

      return response.internalServerError(error)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateAuthValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const data = await new AuthServices().update(
        request.body(),
        request.params().id
      )

      return response.ok(data)
    } catch (error) {
      if (error.status === 400)
        return response.badRequest({ message: error.message })

      return response.internalServerError(error)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      await request.validate(DeleteAuthValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      await new AuthServices().destroy(request.params())

      return response.ok({ message: 'Auth has been deleted.' })
    } catch (error) {
      if (error.status === 400)
        return response.badRequest({ message: error.message })

      return response.internalServerError(error)
    }
  }

  public async list({ request, response }: HttpContextContract) {
    try {
      await request.validate(ListAuthValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const data = await new AuthServices().list({ ...request.qs() })

      return response.ok(data)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
