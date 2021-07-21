import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Endpoint from 'App/Models/Endpoint'
import CreateEndpoint from 'App/Validators/Endpoint/CreateEndpointValidator'
import UpdateEndpoint from 'App/Validators/Endpoint/UpdateEndpointValidator'
import ListEndpoint from 'App/Validators/Endpoint/ListEndpointValidator'
import DeleteEndpoint from 'App/Validators/Endpoint/DeleteEndpointValidator'

export default class EndpointsController {
  public async index({ response }: HttpContextContract) {
    const data = await Endpoint.all()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const validator = await request.validate(CreateEndpoint)
      const data = await Endpoint.create(validator)

      return response.created(data)
    } catch (error) {
      return response.badRequest(error.messages.errors)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const { params, ...validator } = await request.validate(UpdateEndpoint)
      const data = await Endpoint.find(params.id)

      if (!data) {
        return response.badRequest({ message: 'Internal Server Error' })
      }

      data.merge(validator)
      await data.save()

      return response.ok(data)
    } catch (error) {
      return response.badRequest(error.messages.errors)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const { params } = await request.validate(DeleteEndpoint)

      const data = await Endpoint.find(params.id)

      if (!data) {
        return response.badRequest({ message: 'Endpoint Not Exists' })
      }

      await data.delete()

      return response.ok({ message: 'Endpoint Has Been Deleted' })
    } catch (error) {
      return response.badRequest(error.messages.errors)
    }
  }

  public async list({ request, response }: HttpContextContract) {
    try {
      const where = await request.validate(ListEndpoint)
      const data = await Endpoint.query()
        .where({ ...where })
        .orderBy('id')

      if (!data.length) {
        return response.badRequest({ message: 'Endpoints Not Exists' })
      }

      return response.ok(data)
    } catch (error) {
      return response.badRequest(error.messages.errors)
    }
  }
}
