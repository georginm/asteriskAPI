import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Queue from 'App/Models/Queue'
import { DateTime } from 'luxon'

export default class QueuesController {
  public async index({ response }: HttpContextContract) {
    const data = await Queue.query().whereNull('deleted_at')

    if (!data) {
      return response.badRequest({ message: 'There are not Queues' })
    }

    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = request.body()

    const dataExists = await Queue.find(name)

    if (dataExists) {
      return response.badRequest({ message: 'Queue Already Exists' })
    }

    const data = await Queue.create(request.body())

    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    var { name } = request.params()

    const data = await Queue.find(name)

    if (!data) {
      return response.badRequest({ message: 'Queue Not Exists' })
    }
    // If the body has name, the current queue is disabled and another
    // one is generated with the given name
    var { name } = request.body()

    if (!name) {
      await data.merge(request.body())
      await data.save()
      return response.ok(data)
    }

    const newNameExists = await Queue.find(name)

    if (!newNameExists) {
      await data.merge({ deletedAt: DateTime.now() }).save()
      const newData = await Queue.create(request.body())

      return response.ok(newData)
    }

    return response.badRequest({ message: 'Queue Already Exists' })
  }

  public async softdelete({ request, response }: HttpContextContract) {
    const { name } = request.params()
    const data = await Queue.find(name)

    if (!data) {
      return response.badRequest({ message: 'Queue Not Exists' })
    }

    if (data.deletedAt) {
      return response.badRequest({ message: 'Queue is already disabled' })
    }

    await data.merge({ deletedAt: DateTime.now() }).save()

    return response.ok({ message: 'Queue Has Been Disabled' })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { name } = request.params()
    const data = await Queue.find(name)

    if (!data) {
      return response.badRequest({ message: 'Queue Not Exists' })
    }

    await data.delete()

    return response.ok({ message: 'Queue Has Been Deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const where = request.qs()
    const data = await Queue.query().where(where)
    if (!data) {
      return response.badRequest({ message: 'There are not Queues' })
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
