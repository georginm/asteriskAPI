import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, notFound, ok } from 'App/Helpers/http-helper'
import Auth from 'App/Models/Auth'
import Endpoint from 'App/Models/Endpoint'

export default class AuthController {
  public async index({ response }: HttpContextContract) {
    const data = await Auth.all()
    return ok(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { id } = request.body()

    const dataExists = await Auth.find(id)

    if (dataExists) {
      return badRequest(response, 'Auth Already Exists')
    }

    const data = await Auth.create(request.body())

    return created(response, data)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Auth.find(id)

    if (!data) {
      return notFound(response, 'Auth Not Exists')
    }

    data.merge(request.body())

    await data.save()

    return ok(response, data)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Auth.find(id)

    if (!data) {
      return notFound(response, 'Auth Not Exists')
    }

    await data.delete()

    const endpoint = await Endpoint.find(id)
    if (endpoint) {
      await endpoint.delete
    }

    return ok(response, { message: 'Auth Has Been Deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await Auth.find(id)
    if (!data) {
      return notFound(response, 'Auth Not Exists')
    }

    return ok(response, data)
  }
}
