import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, success } from 'App/Helpers/http-helper'
import Aor from 'App/Models/Aor'
import Endpoint from 'App/Models/Endpoint'

export default class AorsController {
  public async index({ response }: HttpContextContract) {
    const data = await Aor.all()
    return success(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { id } = request.body()

    if (!id) {
      return badRequest(response, 'aor id not provided')
    }
    const dataExists = await Aor.find(id)

    if (dataExists) {
      return badRequest(response, 'aor already exists')
    }

    const data = await Aor.create(request.body())

    return created(response, data)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Aor.find(id)

    if (!data) {
      return badRequest(response, 'aor not exists')
    }

    data.merge(request.body())

    await data.save()

    return success(response, data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Aor.find(id)

    if (!data) {
      return badRequest(response, 'aor not exists')
    }

    await data.delete()

    return success(response, { message: 'aor has been deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const where = request.qs()
    const data = await Aor.query().where(where)
    if (!data.length) {
      return badRequest(response, 'aor not exists')
    }

    return success(response, data)
  }
}
