import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Extension from 'App/Models/Extension'
import {
  CreateExtensionValidator,
  UpdateExtensionValidator,
} from 'App/Validators/Extension'

export default class ExtensionsController {
  public async index({ response }: HttpContextContract) {
    const data = await Extension.query().orderBy('context').orderBy('priority')
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateExtensionValidator)
    } catch (error) {
      return response.unprocessableEntity(error.messages.errors)
    }

    try {
      const data = await Extension.create(request.body())
      return response.created(data)
    } catch (error) {
      if (error.status === 400) {
        return response.badRequest({ message: error.message })
      }

      return response.internalServerError(error)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { params, ...validator } = await request.validate(
      UpdateExtensionValidator
    )

    const data = await Extension.find(params.id)

    if (!data) {
      return response.badRequest({ message: 'Extension Not Exists' })
    }

    await data.delete()

    const newData = await Extension.create({
      ...data.$attributes,
      ...request.body(),
    })

    return response.ok(newData)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Extension.find(id)

    if (!data) {
      return response.badRequest({ message: 'Extension Not Exists' })
    }

    await data.delete()

    return response.ok({
      message: 'Extension Has Been Deleted',
    })
  }

  public async list({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await Extension.find(id)
    if (!data) {
      return response.badRequest({ message: 'Extension Not Exists' })
    }

    return response.ok(data)
  }
}
