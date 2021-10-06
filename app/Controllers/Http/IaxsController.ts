import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IaxService from 'App/Services/IaxServices'
import {
  CreateIaxValidator,
  UpdateIaxValidator,
  DeleteIaxValidator,
  ListIaxValidator,
} from 'App/Validators/Iax'
import PaginateValidator from 'App/Validators/PaginateValidator'

export default class IaxsController {
  public async index({ response, request }: HttpContextContract) {
    await request.validate(PaginateValidator)

    const limit = request.input('limit')
    const page = request.input('page', 1)

    const data = await new IaxService().index(page, limit)
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateIaxValidator)

    const data = await new IaxService().create(request.body())

    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateIaxValidator)

    const data = await new IaxService().update(
      request.body(),
      request.params().id
    )

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteIaxValidator)

    await new IaxService().delete(request.params().id)

    return response.ok({ message: 'Iax Has Been Deleted' })
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListIaxValidator)
    await request.validate(PaginateValidator)

    const limit = request.input('limit')
    const page = request.input('page', 1)

    const data = await new IaxService().show(request.params().data, page, limit)

    return response.ok(data)
  }
}
