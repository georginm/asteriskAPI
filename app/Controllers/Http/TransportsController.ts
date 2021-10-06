import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransportService from 'App/Services/TransportService'
import PaginateValidator from 'App/Validators/PaginateValidator'
import {
  CreateTransportValidator,
  DeleteTransportValidator,
  ListTransportValidator,
  UpdateTransportValidator,
} from 'App/Validators/Transport'

export default class TransportsController {
  public async index({ response, request }: HttpContextContract) {
    await request.validate(PaginateValidator)

    const limit = request.input('limit')
    const page = request.input('page', 1)

    const data = await new TransportService().index(page, limit)

    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateTransportValidator)

    const data = await new TransportService().create(request.body())
    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateTransportValidator)

    const { id } = request.params()
    const data = await new TransportService().update(request.body(), id)

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteTransportValidator)

    await new TransportService().destroy(request.params().id)

    return response.ok({ message: 'Transport Has Been Deleted' })
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListTransportValidator)
    await request.validate(PaginateValidator)

    const limit = request.input('limit')
    const page = request.input('page', 1)

    const data = await new TransportService().show(
      request.params().data,
      page,
      limit
    )

    return response.ok(data)
  }
}
