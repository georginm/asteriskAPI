import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QueueServices from 'App/Services/QueueServices'
import PaginateValidator from 'App/Validators/PaginateValidator'
import {
  CreateQueueValidator,
  DeleteQueueValidator,
  ListQueueValidator,
  UpdateQueueValidator,
} from 'App/Validators/Queue'

export default class QueuesController {
  public async show({ response, request }: HttpContextContract) {
    await request.validate(PaginateValidator)

    const { limit = 10, page = 1, filter = null } = request.all()

    const data = await new QueueServices().show(page, limit, filter)

    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateQueueValidator)

    const data = await new QueueServices().create(request.body())
    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateQueueValidator)

    const { name } = request.params()
    const data = await new QueueServices().update(request.body(), name)

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteQueueValidator)

    await new QueueServices().destroy(request.params().name)

    return response.ok({ message: 'Queue Has Been Deleted' })
  }

  public async index({ request, response }: HttpContextContract) {
    await request.validate(ListQueueValidator)

    const data = await new QueueServices().index(request.qs().name)

    return response.ok(data)
  }
}
