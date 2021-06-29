import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, success } from 'App/Helpers/http-helper'
import Auth from 'App/Models/Auth'
import Endpoint from 'App/Models/Endpoint'

export default class AuthController {
  public async index({ response }: HttpContextContract) {
    const data = await Auth.all()
    return success(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { id } = request.body()

    const dataExists = await Auth.find(id)

    if (dataExists) {
      return badRequest(response, { message: 'Auth Already Exists' })
    }

    const data = await Auth.create(request.body())

    return success(response, data, 201)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Auth.find(id)

    if (!data) {
      return badRequest(response, { message: 'Auth Not Exists' }, 404)
    }

    data.merge(request.body())

    await data.save()

    return success(response, data)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Auth.find(id)

    if (!data) {
      return badRequest(response, { message: 'Auth Not Exists' }, 404)
    }

    await data.delete()

    const endpoint = await Endpoint.find(id)
    if (endpoint) {
      await endpoint.delete
    }

    return success(response, { message: 'Auth Has Been Deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await Auth.find(id)
    if (!data) {
      return badRequest(response, { message: 'Auth Not Exists' })
    }

    return success(response, data, 200)
  }
}
