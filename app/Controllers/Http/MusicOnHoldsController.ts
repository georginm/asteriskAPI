import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MusicOnHoldService from 'App/Services/MusicOnHoldService'
import {
  CreateMusicOnHoldValidator,
  UpdateMusicOnHoldValidator,
  ListMusicOnHoldValidator,
  DeleteMusicOnHoldValidator,
} from 'App/Validators/MusicOnHold'
import PaginateValidator from 'App/Validators/PaginateValidator'

export default class MusicOnHoldsController {
  public async index({ response, request }: HttpContextContract) {
    await request.validate(PaginateValidator)

    const { limit = 10, page = 1, filter = null } = request.all()

    const data = await new MusicOnHoldService().index(page, limit, filter)
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateMusicOnHoldValidator)

    const data = await new MusicOnHoldService().create(request.body())
    return response.created({ data })
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateMusicOnHoldValidator)
    const { name } = request.params()

    const data = await new MusicOnHoldService().update(request.body(), name)

    return response.ok({ data })
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteMusicOnHoldValidator)

    await new MusicOnHoldService().delete(request.params().name)

    return response.ok({ message: 'MusicOnHold Has Been Deleted.' })
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListMusicOnHoldValidator)

    const data = await new MusicOnHoldService().show(request.params().name)

    return response.ok(data)
  }
}
