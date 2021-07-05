import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, success } from 'App/Helpers/http-helper'

import QueueMember from 'App/Models/QueueMember'
import Queue from 'App/Models/Queue'
import { alreadyExists, insert } from 'App/Services/DatabaseMethods'
import Endpoint from 'App/Models/Endpoint'

export default class QueueMembersController {
  public async index({ response }: HttpContextContract) {
    const data = await QueueMember.query().orderBy('interface')
    return success(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const inter = request.only(['interface'])
    const queue = request.only(['queue_name'])

    const endpointAlreadyExists = await Endpoint.find(
      inter.interface.split('/')[1]
    )

    if (!endpointAlreadyExists) {
      return badRequest(response, 'Interface Not Found')
    }

    const queueAlreadyExists = await Queue.find(queue.queue_name)

    if (!queueAlreadyExists) {
      return badRequest(response, 'Queue Not Found')
    }

    const dataExists = await alreadyExists('queue_members', inter)

    if (dataExists) {
      return badRequest(response, 'QueueMember Already Exists')
    }

    const data = await insert('queue_members', request.body())

    return created(response, data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { uniqueid } = request.params()

    const data = await QueueMember.findBy('uniqueid', uniqueid)

    if (!data) {
      return badRequest(response, 'QueueMember Not Exists')
    }

    await QueueMember.query().where(data.$attributes).delete()

    return success(response, {
      message: 'QueueMember Has Been Deleted',
    })
  }

  public async list({ request, response }: HttpContextContract) {
    const { endpoint, ...select } = request.qs()
    var data
    console.log(endpoint)
    if (endpoint) {
      data = await QueueMember.query().where({
        interface: endpoint,
        ...select,
      })
    } else {
      data = await QueueMember.query().where(select)
    }

    if (!data.lenght) {
      return badRequest(response, 'QueueMember Not Exists')
    }

    return success(response, data)
  }
}
