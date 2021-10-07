import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExtensionService from 'App/Services/ExtensionService'
import {
  CreateExtensionValidator,
  ListExtensionValidator,
  UpdateExtensionValidator,
  DeleteExtensionValidator,
} from 'App/Validators/Extension'
import PaginateValidator from 'App/Validators/PaginateValidator'

export default class ExtensionsController {
  public async show({ response, request }: HttpContextContract) {
    await request.validate(PaginateValidator)

    const { limit = 10, page = 1, filter = null } = request.all()

    const data = await new ExtensionService().show(page, limit, filter)
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateExtensionValidator)

    const data = await new ExtensionService().create(request.body())
    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateExtensionValidator)

    const data = await new ExtensionService().update(
      request.params().id,
      request.body()
    )

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteExtensionValidator)

    await new ExtensionService().destroy(request.params().id)
    return response.ok({
      message: 'Extension Has Been Deleted',
    })
  }

  public async index({ request, response }: HttpContextContract) {
    await request.validate(ListExtensionValidator)

    const data = await new ExtensionService().index(request.qs().id)

    return response.ok(data)
  }
}
