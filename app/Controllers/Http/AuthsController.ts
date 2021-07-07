import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, success } from 'App/Helpers/http-helper'
import Auth from 'App/Models/Auth'
import Endpoint from 'App/Models/Endpoint'

export default class AuthController {
  public async index({ response }: HttpContextContract) {
    const data = await Auth.all()
    return success(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { username, id } = request.body()

    const requireFields = ['id', 'username', 'auth_type', 'password']

    for (const field of requireFields) {
      if (!request.body()[field]) {
        return badRequest(response, `${field} was not provided`)
      }
    }

    const idAlreadyExists = await Auth.find(id)

    if (idAlreadyExists) {
      return badRequest(response, 'auth id already exists')
    }

    const userNameExists = await Auth.findBy('username', username)

    if (userNameExists) {
      return badRequest(response, 'auth username already exists')
    }

    const data = await Auth.create(request.body())

    return created(response, data)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const { username } = request.body()

    if (username) {
      const userNameAlreadyExists = await Auth.findBy('username', username)
      if (userNameAlreadyExists) {
        return badRequest(response, 'Username Already Exists')
      }
    }

    const data = await Auth.find(id)

    if (!data) {
      return badRequest(response, 'Auth Not Exists')
    }

    data.merge(request.body())

    await data.save()

    return success(response, data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Auth.find(id)

    if (!data) {
      return badRequest(response, 'Auth Not Exists')
    }

    await data.delete()

    const endpoint = await Endpoint.find(id)
    if (endpoint) {
      await endpoint.delete()
    }

    return success(response, { message: 'Auth Has Been Deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const where = request.qs()
    const data = await Auth.query().where(where)
    if (!data) {
      return badRequest(response, 'Auth Not Exists')
    }

    return success(response, data)
  }
}
