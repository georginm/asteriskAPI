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

    const limit = request.input('limit')
    const page = request.input('page', 1)

    const data = await new RegistrationService().index(page, limit)

    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateRegistrationValidator)

    const data = await new RegistrationService().create(request.body())
    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateRegistrationValidator)

    const { id } = request.params()
    const data = await new RegistrationService().update(request.body(), id)

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteRegistrationValidator)

    await new RegistrationService().destroy(request.params().id)

    return response.ok({ message: 'Transport Has Been Deleted' })
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListRegistrationValidator)
    await request.validate(PaginateValidator)

    const limit = request.input('limit')
    const page = request.input('page', 1)

    const data = await new RegistrationService().show(
      request.params().data,
      page,
      limit
    )

    return response.ok(data)
  }
}
