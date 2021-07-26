import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Endpoint from 'App/Models/Endpoint'
import {
  CreateEndpointValidator,
  UpdateEndpointValidator,
  ListEndpointValidator,
  DeleteEndpointValidator,
} from 'App/Validators/Endpoint'

export default class EndpointsController {
  public async index({ response }: HttpContextContract) {
    const data = await Endpoint.all()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const validator = await request.validate(CreateEndpointValidator)
      const data = await Endpoint.create(validator)

      return response.created(data)
    } catch (error) {
      return response.badRequest(error.messages.errors)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const { params, ...validator } = await request.validate(
        UpdateEndpointValidator
      )
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
      const { params } = await request.validate(DeleteEndpointValidator)

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
      const where = await request.validate(ListEndpointValidator)
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
