import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, success } from 'App/Helpers/http-helper'
import Queue from 'App/Models/Queue'
import { DateTime } from 'luxon'

export default class QueuesController {
  public async index({ response }: HttpContextContract) {
    const data = await Queue.query().whereNull('deleted_at')

    if (!data) {
      return badRequest(response, { message: 'Queue Not Exists' })
    }

    return success(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = request.body()

    const dataExists = await Queue.find(name)

    if (dataExists) {
      return badRequest(response, { message: 'Queue Already Exists' })
    }

    const data = await Queue.create(request.body())

    return success(response, data, 201)
  }

  public async update({ request, response }: HttpContextContract) {
    const { name } = request.params()

    const data = await Queue.find(name)

    if (!data) {
      return badRequest(response, { message: 'Queue Not Exists' }, 404)
    }
    // If the body has name, the current queue is disabled and another
    // one is generated with the given name
    const nameBody = request.body().name

    if (!nameBody) {
      await data.merge(request.body())
      await data.save()
      return success(response, data)
    }

    const newNameExists = await Queue.find(nameBody)

    if (!newNameExists) {
      await data.merge({ deletedAt: DateTime.now() }).save()
      const newData = await Queue.create(request.body())

      return success(response, newData)
    }

    return badRequest(response, { message: 'Queue Already Exists' })
  }

  public async softdelete({ request, response }: HttpContextContract) {
    const { name } = request.params()
    const data = await Queue.find(name)

    if (!data) {
      return badRequest(response, { message: 'Queue Not Exists' }, 404)
    }

    await data.merge({ deletedAt: DateTime.now() }).save()

    return success(response, { message: 'Queue Has Been Deleted' })
  }

  public async delete({ request, response }: HttpContextContract) {
    const { name } = request.params()
    const data = await Queue.find(name)

    if (!data) {
      return badRequest(response, { message: 'Queue Not Exists' }, 404)
    }

    await data.delete()

    return success(response, { message: 'Queue Has Been Deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const { name } = request.params()
    const data = await Queue.find(name)
    if (!data) {
      return badRequest(response, { message: 'Queue Not Exists' })
    }

    return success(response, data, 200)
  }

  public async listDeleted({ response }: HttpContextContract) {
    const data = await Queue.query().whereNotNull('deleted_at')

    if (!data) {
      return badRequest(response, { message: 'Queue Not Exists' })
    }

    return success(response, data)
  }
}
