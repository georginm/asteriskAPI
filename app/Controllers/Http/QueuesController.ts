import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, success } from 'App/Helpers/http-helper'
import Queue from 'App/Models/Queue'
import { DateTime } from 'luxon'

export default class QueuesController {
  public async index({ response }: HttpContextContract) {
    const data = await Queue.all()
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

    // const nameBody = request.body().name
    // console.log(nameBody)
    await data.merge(request.body())

    await data.save()

    return success(response, data)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { name } = request.params()

    const data = await Queue.find(name)

    if (!data) {
      return badRequest(response, { message: 'Queue Not Exists' }, 404)
    }

    await data.merge({ deletedAt: DateTime.now() }).save()

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
}
