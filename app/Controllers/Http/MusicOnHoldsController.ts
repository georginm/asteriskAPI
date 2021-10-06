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

    const limit = request.input('limit')
    const page = request.input('page', 1)

    const data = await new MusicOnHoldService().index(page, limit)
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateMusicOnHoldValidator)

    const data = await new MusicOnHoldService().create(request.body())
    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateMusicOnHoldValidator)

    const { name } = request.params()
    const data = await new MusicOnHoldService().update(request.body(), name)

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteMusicOnHoldValidator)

    await new MusicOnHoldService().delete(request.params().name)

    return response.ok({ message: 'MusicOnHold Has Been Deleted.' })
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListMusicOnHoldValidator)
    await request.validate(PaginateValidator)

    const limit = request.input('limit')
    const page = request.input('page', 1)

    const data = await new MusicOnHoldService().show(
      request.params().data,
      page,
      limit
    )

    return response.ok(data)
  }
}
