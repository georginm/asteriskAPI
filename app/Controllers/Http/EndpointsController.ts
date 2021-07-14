import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, success } from 'App/Helpers/http-helper'
import Endpoint from 'App/Models/Endpoint'
// import { errorHandle } from 'App/utils/errorHandle'
import CreateEndpoint from 'App/Validators/CreateEndpointValidator'

export default class EndpointsController {
  public async index({ response }: HttpContextContract) {
    const data = await Endpoint.all()
    return success(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const validator = await request.validate(CreateEndpoint)
      const data = await Endpoint.create(validator)

      return created(response, data)
    } catch (error) {
      return badRequest(response, error.messages.errors)
      // return badRequest(response, errorHandle(error.messages.errors, fields))
    }
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
