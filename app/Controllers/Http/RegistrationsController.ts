import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrationService from 'App/Services/RegistrationService'
import {
  CreateRegistrationValidator,
  DeleteRegistrationValidator,
  UpdateRegistrationValidator,
} from 'App/Validators/Registration'

export default class RegistrationsController {
  public async index({ response }: HttpContextContract) {
    const data = await new RegistrationService().index()

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

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
