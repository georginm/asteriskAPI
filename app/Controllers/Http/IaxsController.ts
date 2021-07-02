import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, ok } from 'App/Helpers/http-helper'
import Iax from 'App/Models/Iax'
import Endpoint from 'App/Models/Endpoint'

export default class IaxsController {
  public async index({ response }: HttpContextContract) {
    const data = await Iax.all()
    return ok(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = request.body()

    const dataExists = await Iax.findBy('name', name)

    if (dataExists) {
      return badRequest(response, 'Iax Already Exists')
    }

    const data = await Iax.create(request.body())

    return created(response, data)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Iax.find(id)

    if (!data) {
      return badRequest(response, 'Iax Not Exists')
    }

    data.merge(request.body())

    await data.save()

    return ok(response, data)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Iax.find(id)

    if (!data) {
      return badRequest(response, 'Iax Not Exists')
    }

    await data.delete()

    const endpoint = await Endpoint.find(id)
    if (endpoint) {
      await endpoint.delete
    }

    return ok(response, { message: 'Iax Has Been Deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await Iax.find(id)
    if (!data) {
      return badRequest(response, 'Iax Not Exists')
    }

    return ok(response, data)
  }
}
