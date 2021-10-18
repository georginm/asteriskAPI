import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrationService from 'App/Services/RegistrationService'
import PaginateValidator from 'App/Validators/PaginateValidator'
import {
  CreateRegistrationValidator,
  DeleteRegistrationValidator,
  ListRegistrationValidator,
  UpdateRegistrationValidator,
} from 'App/Validators/Registration'

export default class RegistrationsController {
  public async index({ response, request }: HttpContextContract) {
    await request.validate(PaginateValidator)

    const { limit = 10, page = 1, filter = null } = request.all()

    const data = await new RegistrationService().index(page, limit, filter)

    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateRegistrationValidator)

    const data = await new RegistrationService().create(request.body())
    return response.created({ data })
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateRegistrationValidator)

    const { id } = request.params()
    const data = await new RegistrationService().update(request.body(), id)

    return response.ok({ data })
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteRegistrationValidator)

    await new RegistrationService().destroy(request.params().id)

    return response.noContent()
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListRegistrationValidator)

    const data = await new RegistrationService().show(request.params().id)

    return response.ok(data)
  }
}
