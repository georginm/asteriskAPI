import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, success } from 'App/Helpers/http-helper'
import Endpoint from 'App/Models/Endpoint'
import Aor from 'App/Models/Aor'
import Auth from 'App/Models/Auth'
import { selectAll } from 'App/Services/DatabaseMethods'

export default class EndpointsController {
  public async index({ response }: HttpContextContract) {
    const data = await Endpoint.all()
    return success(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { id } = request.body()

    const aor = await Aor.find(id)

    if (!aor) {
      return badRequest(response, 'Aor Not Exists')
    }

    const auth = await Auth.find(id)

    if (!auth) {
      return badRequest(response, 'Auth Not Exists')
    }

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
      return badRequest(response, 'Endpoint Not Exists')
    }

    data.merge(request.body())

    await data.save()

    return success(response, data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Endpoint.find(id)

    if (!data) {
      return badRequest(response, 'Endpoint Not Exists')
    }

    await data.delete()

    return success(response, {
      message: 'Endpoint Has Been Deleted',
    })
  }

  public async list({ request, response }: HttpContextContract) {
    const where = request.qs()

    const data = await Endpoint.query().where(where).orderBy('id')

    if (!data.length) {
      return badRequest(response, 'Endpoints Not Exists')
    }

    return success(response, data)
  }
}
