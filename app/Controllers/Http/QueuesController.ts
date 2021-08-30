import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { QueueServices } from 'App/Services/QueueServices'
import { status } from 'App/utils/verifyStatusCode'
import {
  CreateQueueValidator,
  DeleteQueueValidator,
  ListQueueValidator,
  UpdateQueueValidator,
} from 'App/Validators/Queue'

export default class QueuesController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await new QueueServices().index()

      if (!data.length) {
        return response.ok({ message: 'Nenhuma fila cadastrada.' })
      }

      return response.ok(data)
    } catch (error) {
      return response.internalServerError(error)
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateQueueValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const data = await new QueueServices().create(request.body())
      return response.created(data)
    } catch (error) {
      return status(response, error)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateQueueValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const { name } = request.params()
      const data = await new QueueServices().update(request.body(), name)

      return response.ok(data)
    } catch (error) {
      return status(response, error)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      await request.validate(DeleteQueueValidator)
    } catch (error) {}

    try {
      await new QueueServices().destroy(request.params().name)
      return response.ok({ message: 'Queue Has Been Deleted' })
    } catch (error) {
      return status(response, error)
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      await request.validate(ListQueueValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const data = await new QueueServices().show(request.params().data)
      if (!data.length) {
        return response.badRequest({
          message: 'Queue Not Exists',
        })
      }

      return response.ok(data)
    } catch (error) {
      return status(response, error)
    }
  }
}
