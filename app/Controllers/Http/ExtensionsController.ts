import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExtensionService from 'App/Services/ExtensionService'
import {
  CreateExtensionValidator,
  ListExtensionValidator,
  UpdateExtensionValidator,
  DeleteExtensionValidator,
} from 'App/Validators/Extension'

export default class ExtensionsController {
  public async index({ response }: HttpContextContract) {
    const data = await new ExtensionService().index()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateExtensionValidator)

    const data = await new ExtensionService().create(request.body())
    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateExtensionValidator)

    const { id } = request.params()
    const data = await new ExtensionService().update(id, request.body())

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteExtensionValidator)

    await new ExtensionService().destroy(request.params().id)
    return response.ok({
      message: 'Extension Has Been Deleted',
    })
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListExtensionValidator)

    const data = await new ExtensionService().show(request.params().data)

    return response.ok(data)
  }
}
