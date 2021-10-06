import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import QueueMemberService from 'App/Services/QueueMemberService'
import PaginateValidator from 'App/Validators/PaginateValidator'
import {
  CreateQueueMemberValidator,
  DeleteQueueMemberValidator,
  ListQueueMemberValidator,
  UpdateQueueMemberValidator,
} from 'App/Validators/QueueMember'

export default class QueueMembersController {
  public async index({ response, request }: HttpContextContract) {
    await request.validate(PaginateValidator)

    const limit = request.input('limit')
    const page = request.input('page', 1)

    const data = await new QueueMemberService().index(page, limit)
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateQueueMemberValidator)

    const data = await new QueueMemberService().create(request.body())
    return response.created(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteQueueMemberValidator)
    await new QueueMemberService().destroy(request.params().interface)

    return response.ok({
      message: 'QueueMember Has Been Deleted',
    })
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateQueueMemberValidator)

    const data = await new QueueMemberService().update(
      request.body(),
      request.params().interface
    )

    return response.ok(data)
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListQueueMemberValidator)
    await request.validate(PaginateValidator)

    const limit = request.input('limit')
    const page = request.input('page', 1)

    const data = await new QueueMemberService().show(
      request.params().data,
      page,
      limit
    )

    return response.ok(data)
  }
}
