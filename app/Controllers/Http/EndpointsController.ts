import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, success } from 'App/Helpers/http-helper'
import Endpoint from 'App/Models/Endpoint'
import Aor from 'App/Models/Aor'
import Auth from 'App/Models/Auth'

export default class EndpointsController {
  public async index({ response }: HttpContextContract) {
    const data = await Endpoint.all()
    return success(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { id, aors, auth } = request.body()

    const requiredFields = [
      'id',
      'transport',
      'context',
      'aors',
      'auth',
      'mac_address',
    ]

    // console.log('Endpoint Controller Store - Required field was not provided?')

    for (const field of requiredFields) {
      if (!request.body()[field]) {
        return badRequest(response, `${field} not provided`)
      }
    }

    // console.log('Endpoint Controller Store - AOR not exists?')

    const aor = await Aor.find(aors)

    if (!aor) {
      return badRequest(response, 'Aor Not Exists')
    }

    // console.log('Endpoint Controller Store - Auth not exists?')

    const auths = await Auth.find(auth)

    if (!auths) {
      return badRequest(response, 'Auth Not Exists')
    }

    // console.log('Endpoint Controller Store - Endpoint already exists?')

    const dataExists = await Endpoint.find(id)

    if (dataExists) {
      return badRequest(response, 'Endpoint Already Exists')
    }

    const data = await Endpoint.create(request.body())

    return created(response, data)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    // console.log(`Update Controller - ID Exists? id: ${id}`)

    const data = await Endpoint.findBy('id', id)

    // console.log(`Data: ${data}`)

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
