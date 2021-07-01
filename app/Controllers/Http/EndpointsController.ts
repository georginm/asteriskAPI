import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, notFound, ok } from 'App/Helpers/http-helper'
import Endpoint from 'App/Models/Endpoint'

export default class EndpointsController {
  public async index({ response }: HttpContextContract) {
    const data = await Endpoint.all()
    return ok(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { id } = request.body()

    const dataExists = await Endpoint.find(id)

    if (dataExists) {
      return badRequest(response, 'Endpoint Already Exists')
    }

    const data = await Endpoint.create(request.body())

    return created(response, data)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Endpoint.find(id)

    if (!data) {
      return notFound(response, 'Endpoint Not Exists')
    }

    data.merge(request.body())

    await data.save()

    return ok(response, data)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Endpoint.find(id)

    if (!data) {
      return notFound(response, 'Endpoint Not Exists')
    }

    await data.delete()

    return ok(response, { message: 'Endpoint Has Been Deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await Endpoint.find(id)
    if (!data) {
      return notFound(response, 'Endpoint Not Exists')
    }

    return ok(response, data)
  }
}
