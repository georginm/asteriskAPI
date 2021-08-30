import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EndpointService from 'App/Services/EndpointServices'
import { status } from 'App/utils/verifyStatusCode'
import {
  CreateEndpointValidator,
  UpdateEndpointValidator,
  ListEndpointValidator,
  DeleteEndpointValidator,
} from 'App/Validators/Endpoint'

export default class EndpointsController {
  public async index({ response }: HttpContextContract) {
    const data = await new EndpointService().index()
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
      return status(response, error)
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
      const data = await new EndpointService().update(request.body(), id)

      return response.ok(data)
    } catch (error) {
      return status(response, error)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      await request.validate(DeleteEndpointValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      await new EndpointService().destroy(request.params().id)

      return response.ok({ message: 'Endpoint Has Been Deleted.' })
    } catch (error) {
      return status(response, error)
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      await request.validate(ListEndpointValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const data = await new EndpointService().show(request.params().data)

      if (!data.length) {
        return response.badRequest({
          message: 'Endpoint Not Exists',
        })
      }

      return response.ok(data)
    } catch (error) {
      return response.internalServerError({ message: error.message })
    }
  }
}
