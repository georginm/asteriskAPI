import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EndpointService from 'App/Services/EndpointServices'
import {
  CreateEndpointValidator,
  UpdateEndpointValidator,
  ListEndpointValidator,
  DeleteEndpointValidator,
} from 'App/Validators/Endpoint'
import PaginateValidator from 'App/Validators/PaginateValidator'

export default class EndpointsController {
  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListEndpointValidator)
    // await request.validate(PaginateValidator)

    const data = await new EndpointService().show(request.params().id)

    return response.ok(data)
  }
  public async index({ response, request }: HttpContextContract) {
    await request.validate(PaginateValidator)

    const { limit = 10, page = 1, filter = null } = request.all()

    const data = await new EndpointService().index(page, limit, filter)
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateEndpointValidator)

    const data = await new EndpointService().create(request.body())
    return response.created({ data })
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateEndpointValidator)

    const { id } = request.params()
    const data = await new EndpointService().update(request.body(), id)

    return response.ok({ data })
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteEndpointValidator)

    await new EndpointService().destroy(request.params().id)

    return response.noContent()
  }
}
