import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, success } from 'App/Helpers/http-helper'
import Extension from 'App/Models/Extension'

export default class ExtensionsController {
  public async index({ response }: HttpContextContract) {
    const data = await Extension.query().orderBy('context').orderBy('priority')
    return success(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await Extension.create(request.body())
      return created(response, data)
    } catch (error) {
      return badRequest(response, error.message)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Extension.find(id)

    if (!data) {
      return badRequest(response, 'Extension Not Exists')
    }

    await data.delete()

    const newData = await Extension.create({
      ...data.$attributes,
      ...request.body(),
    })

    return success(response, newData)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Extension.find(id)

    if (!data) {
      return badRequest(response, 'Extension Not Exists')
    }

    await data.delete()

    return success(response, {
      message: 'Extension Has Been Deleted',
    })
  }

  public async list({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await Extension.find(id)
    if (!data) {
      return badRequest(response, 'Extension Not Exists')
    }

    return success(response, data)
  }
}
