import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import IaxService from 'App/Services/IaxServices'
import {
  CreateIaxValidator,
  UpdateIaxValidator,
  DeleteIaxValidator,
  ListIaxValidator,
} from 'App/Validators/Iax'

export default class IaxsController {
  public async index({ response, request }: HttpContextContract) {
    const page = request.input('page', 1)

    const data = await new IaxService().index(page)
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
    const page = request.input('page', 1)

    const data = await new IaxService().show(request.params().data, page)

    return response.ok(data)
  }
}
