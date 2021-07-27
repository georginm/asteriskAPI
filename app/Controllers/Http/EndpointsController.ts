import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EndpointService from 'App/Services/EndpointServices'
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
      await request.validate(CreateEndpointValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const data = await new EndpointService().create(request.body())
      return response.created(data)
    } catch (error) {
      if (error.status === 400) {
        return response.badRequest({ message: error.message })
      }

      return response.internalServerError(error)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateEndpointValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const { id } = request.params()
      const data = await new EndpointService().update({
        id,
        ...request.body(),
      })

      return response.ok(data)
    } catch (error) {
      if (error.status === 400) {
        return response.badRequest({ message: error.message })
      }

      return response.internalServerError(error)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      await request.validate(DeleteEndpointValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      await new EndpointService().destroy(request.params())

      return response.ok({ message: 'Endpoint Has Been Deleted.' })
    } catch (error) {
      if (error.status === 400) {
        return response.badRequest({ message: error.message })
      }

      return response.internalServerError(error)
    }
  }

  public async list({ request, response }: HttpContextContract) {
    try {
      await request.validate(ListEndpointValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    const data = await new EndpointService().list(request.qs())

    if (!data.length) {
      return response.badRequest({
        message: 'There is no endpoint with the information provided.',
      })
    }

    return response.ok(data)
  }
}
