import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import QueueMemberService from 'App/Services/QueueMemberService'
import {
  CreateQueueMemberValidator,
  DeleteQueueMemberValidator,
  ListQueueMemberValidator,
  UpdateQueueMemberValidator,
} from 'App/Validators/QueueMember'
import { status } from 'App/utils/verifyStatusCode'

export default class QueueMembersController {
  public async index({ response }: HttpContextContract) {
    const data = await new QueueMemberService().index()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateQueueMemberValidator)
    } catch (error) {
      return response.unprocessableEntity()
    }

    try {
      const data = await new QueueMemberService().create(request.body())
      return response.created(data)
    } catch (error) {
      return status(response, error)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      await request.validate(DeleteQueueMemberValidator)
    } catch (error) {
      return response.unprocessableEntity()
    }

    try {
      await new QueueMemberService().destroy(request.params().interface)
    } catch (error) {
      return status(response, error)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateQueueMemberValidator)
    } catch (error) {
      return response.unprocessableEntity()
    }

    try {
      const data = await new QueueMemberService().update(
        request.body(),
        request.params().interface
      )

      return response.ok(data)
    } catch (error) {
      return status(response, error)
    }
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
