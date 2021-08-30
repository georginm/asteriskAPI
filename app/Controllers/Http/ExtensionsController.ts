import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExtensionService from 'App/Services/ExtensionService'
import { status } from 'App/utils/verifyStatusCode'
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
    try {
      await request.validate(CreateExtensionValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const data = await new ExtensionService().create(request.body())
      return response.created(data)
    } catch (error) {
      return status(response, error)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateExtensionValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const { id } = request.params()
      const data = await new ExtensionService().update(id, request.body())

      return response.ok(data)
    } catch (error) {
      return status(response, error)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      await request.validate(DeleteExtensionValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      await new ExtensionService().destroy(request.params().id)
      return response.ok({
        message: 'Extension Has Been Deleted',
      })
    } catch (error) {
      return status(response, error)
    }
  }

  public async list({ request, response }: HttpContextContract) {
    try {
      await request.validate(ListExtensionValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    const data = await new ExtensionService().list(request.qs())

    if (!data) {
      return response.badRequest({ message: 'Extension Not Exists' })
    }

    return response.ok(data)
  }
}
