import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrationService from 'App/Services/RegistrationService'

export default class RegistrationsController {
  public async index({ response }: HttpContextContract) {
    const data = await new RegistrationService().index()

    return response.ok(data)
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
