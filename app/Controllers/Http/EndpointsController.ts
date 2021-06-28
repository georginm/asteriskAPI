import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, success } from 'App/Helpers/http-helper'
import Endpoint from 'App/Models/Endpoint'

export default class EndpointsController {
  public async index({ response }: HttpContextContract) {
    const data = await Endpoint.all()
    return success(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { id } = request.body()

    const dataExists = await Endpoint.find(id)

    if (dataExists) {
      return badRequest(response, { message: 'Endpoint Already Exists' })
    }

    const data = await Endpoint.create(request.body())

    return success(response, data, 201)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Endpoint.find(id)

    if (!data) {
      return badRequest(response, { message: 'Endpoint Not Exists' }, 404)
    }

    data.merge(request.body())

    await data.save()

    return success(response, data)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Endpoint.find(id)

    if (!data) {
      return badRequest(response, { message: 'Endpoint Not Exists' }, 404)
    }

    await data.delete()

    return success(response, { message: 'Endpoint Has Been Deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await Endpoint.find(id)
    if (!data) {
      return badRequest(response, { message: 'Endpoint Not Exists' })
    }

    return success(response, data, 200)
  }
}
