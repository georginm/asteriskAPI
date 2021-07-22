import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest } from 'App/Helpers/http-helper'
import Aor from 'App/Models/Aor'
import CreateAorValidator from 'App/Validators/Aor/CreateAorValidator'
import UpdateAorValidator from 'App/Validators/Aor/UpdateAorValidator'

export default class AorsController {
  public async index({ response }: HttpContextContract) {
    const data = await Aor.all()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const validator = await request.validate(CreateAorValidator)

      const data = await Aor.create(validator)

      return response.created(data)
    } catch (error) {
      return response.badRequest(error.messages.errors)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const { params, ...validator } = await request.validate(
        UpdateAorValidator
      )

      const data = await Aor.find(params.id)

      if (!data) {
        return response.badRequest({ message: 'Internal Server Error.' })
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

    const data = await Aor.find(id)

    if (!data) {
      return response.badRequest({ message: 'aor not exists' })
    }

    await data.delete()

    return response.ok({ message: 'aor has been deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const where = request.qs()
    const data = await Aor.query().where(where)
    if (!data.length) {
      return response.badRequest({ message: 'aor not exists' })
    }

    return response.ok(data)
  }
}
