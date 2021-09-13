import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import QueueServices from 'App/Services/QueueServices'
import {
  CreateQueueValidator,
  DeleteQueueValidator,
  ListQueueValidator,
  UpdateQueueValidator,
} from 'App/Validators/Queue'

export default class QueuesController {
  public async index({ response }: HttpContextContract) {
    const data = await new QueueServices().index()

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

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListQueueValidator)

    const data = await new QueueServices().show(request.params().data)

    return response.ok(data)
  }
}
