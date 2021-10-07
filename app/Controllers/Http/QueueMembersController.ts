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
  public async show({ response, request }: HttpContextContract) {
    await request.validate(PaginateValidator)

    const { limit = 10, page = 1, filter = null } = request.all()

    const data = await new QueueMemberService().show(page, limit, filter)
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateQueueMemberValidator)

    const data = await new QueueMemberService().create(request.body())
    return response.created(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteQueueMemberValidator)
    await new QueueMemberService().destroy(request.qs().id)

    return response.ok({
      message: 'QueueMember Has Been Deleted',
    })
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateQueueMemberValidator)

    const data = await new QueueMemberService().update(
      request.body(),
      request.qs().id
    )

    return response.ok(data)
  }

  public async index({ request, response }: HttpContextContract) {
    await request.validate(ListQueueMemberValidator)

    const data = await new QueueMemberService().index(request.qs().id)

    return response.ok(data)
  }
}
