import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import QueueMember from 'App/Models/QueueMember'
import Queue from 'App/Models/Queue'
import Endpoint from 'App/Models/Endpoint'

export default class QueueMembersController {
  public async index({ response }: HttpContextContract) {
    const data = await QueueMember.query().orderBy('interface')
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    const inter = request.only(['interface'])
    const queue = request.only(['queue_name'])

    const endpointAlreadyExists = await Endpoint.find(
      inter.interface.split('/')[1]
    )

    if (!endpointAlreadyExists) {
      return response.badRequest({ message: 'Interface Not Found' })
    }

    const queueAlreadyExists = await Queue.find(queue.queue_name)

    if (!queueAlreadyExists) {
      return response.badRequest({ message: 'Queue Not Found' })
    }

    const dataExists = await alreadyExists('queue_members', inter)

    if (dataExists) {
      return response.badRequest({ message: 'QueueMember Already Exists' })
    }

    const data = await insert('queue_members', request.body())

    return response.created(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { uniqueid } = request.params()

    const data = await QueueMember.findBy('uniqueid', uniqueid)

    if (!data) {
      return response.badRequest({ message: 'QueueMember Not Exists' })
    }

    await QueueMember.query().where(data.$attributes).delete()

    return response.ok({
      message: 'QueueMember Has Been Deleted',
    })
  }

  public async list({ request, response }: HttpContextContract) {
    const { endpoint, ...select } = request.qs()
    var data

    if (endpoint) {
      data = await QueueMember.query().where({
        interface: endpoint,
        ...select,
      })
    } else {
      data = await QueueMember.query().where(select)
    }

  public async show({ request, response }: HttpContextContract) {
    try {
      await request.validate(ListQueueMemberValidator)
    } catch (error) {
      return response.unprocessableEntity()
    }

    try {
      const data = await new QueueMemberService().show(request.params().data)
      if (!data.length)
        return response.badRequest({
          message: 'QueueMember Not Exists',
        })
      return response.ok(data)
    } catch (error) {
      return { message: error.message }
    }
  }
}
