import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, success } from 'App/Helpers/http-helper'
import Endpoint from 'App/Models/Endpoint'
import CreateEndpoint from 'App/Validators/Endpoint/CreateEndpointValidator'
import UpdateEndpoint from 'App/Validators/Endpoint/UpdateEndpointValidator'
import ListEndpoint from 'App/Validators/Endpoint/ListEndpointValidator'
import DeleteEndpoint from 'App/Validators/Endpoint/DeleteEndpointValidator'

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
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const { params } = await request.validate(UpdateEndpoint)
      const data = await Endpoint.find(params.id)

      if (!data) {
        return badRequest(response, 'Internal Server Error')
      }

      data.merge(request.body())
      await data.save()

      return success(response, data)
    } catch (error) {
      return badRequest(response, error.messages.errors)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const { params } = await request.validate(DeleteEndpoint)

      const data = await Endpoint.find(params.id)

      if (!data) {
        return badRequest(response, 'Endpoint Not Exists')
      }

      await data.delete()

      return success(response, {
        message: 'Endpoint Has Been Deleted',
      })
    } catch (error) {
      return badRequest(response, error.messages.errors)
    }
  }

  public async list({ request, response }: HttpContextContract) {
    try {
      const where = await request.validate(ListEndpoint)
      const data = await Endpoint.query()
        .where({ ...where })
        .orderBy('id')

      if (!data.length) {
        return badRequest(response, 'Endpoints Not Exists')
      }

      return success(response, data)
    } catch (error) {
      return badRequest(response, error.messages.errors)
    }
  }
}
