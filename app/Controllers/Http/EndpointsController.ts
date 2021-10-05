import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EndpointService from 'App/Services/EndpointServices'
import {
  CreateEndpointValidator,
  UpdateEndpointValidator,
  ListEndpointValidator,
  DeleteEndpointValidator,
} from 'App/Validators/Endpoint'

export default class EndpointsController {
  public async index({ response, request }: HttpContextContract) {
    const page = request.input('page', 1)

    const data = await new EndpointService().index(page)
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateEndpointValidator)

    const data = await new EndpointService().create(request.body())
    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateEndpointValidator)

    const { id } = request.params()
    const data = await new EndpointService().update(request.body(), id)

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteEndpointValidator)

    await new EndpointService().destroy(request.params().id)

    return response.ok({ message: 'Endpoint Has Been Deleted.' })
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListEndpointValidator)
    const page = request.input('page', 1)

    const data = await new EndpointService().show(request.params().data, page)

    return response.ok(data)
  }
}
