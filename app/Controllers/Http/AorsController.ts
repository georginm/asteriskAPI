import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, ok } from 'App/Helpers/http-helper'
import Aor from 'App/Models/Aor'
import Endpoint from 'App/Models/Endpoint'

export default class AorsController {
  public async index({ response }: HttpContextContract) {
    const data = await Aor.all()
    return ok(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { id } = request.body()
    const dataExists = await Aor.find(id)

    if (dataExists) {
      return badRequest(response, 'Aor Already Exists')
    }

    const data = await Aor.create(request.body())

    return created(response, data)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Aor.find(id)

    if (!data) {
      return badRequest(response, 'Aor Not Exists')
    }

    data.merge(request.body())

    await data.save()

    return ok(response, data)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Aor.find(id)

    if (!data) {
      return badRequest(response, 'Aor Not Exists')
    }

    await data.delete()

    const endpoint = await Endpoint.find(id)
    if (endpoint) {
      await endpoint.delete()
    }

    return ok(response, { message: 'Aor Has Been Deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await Aor.find(id)
    if (!data) {
      return badRequest(response, 'Aor Not Exists')
    }

    return ok(response, data)
  }
}
