import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AorServices from 'App/Services/AorServices'
import {
  CreateAorValidator,
  DeleteAorValidator,
  ListAorValidator,
  UpdateAorValidator,
} from 'App/Validators/Aor'

export default class AorsController {
  public async index({ response }: HttpContextContract) {
    const data = await new AorServices().index()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateAorValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const data = await new AorServices().create(request.body())

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
      await request.validate(UpdateAorValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const data = await new AorServices().update(
        request.body(),
        request.params().id
      )

      return response.ok(data)
    } catch (error) {
      if (error.status === 400)
        return response.badRequest({ message: error.message })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      await request.validate(DeleteAorValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      await new AorServices().destroy(request.params())

      return response.ok({ message: 'Aor has been deleted.' })
    } catch (error) {
      if (error.status === 400)
        return response.badRequest({ message: error.message })

      return response.internalServerError(error)
    }
  }

  public async list({ request, response }: HttpContextContract) {
    try {
      await request.validate(ListAorValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const data = await new AorServices().list({ ...request.qs() })
      return response.ok(data)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
