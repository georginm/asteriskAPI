import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, success } from 'App/Helpers/http-helper'
import Extension from 'App/Models/Extension'

export default class ExtensionsController {
  public async index({ response }: HttpContextContract) {
    const data = await Extension.all()
    return success(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { id } = request.body()

    const dataExists = await Extension.find(id)

    if (dataExists) {
      return badRequest(response, { message: 'Extension Already Exists' })
    }

    const data = await Extension.create(request.body())

    return success(response, data, 201)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Extension.find(id)

    if (!data) {
      return badRequest(response, { message: 'Extension Not Exists' }, 404)
    }

    data.merge(request.body())

    await data.save()

    return success(response, data)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Extension.find(id)

    if (!data) {
      return badRequest(response, { message: 'Extension Not Exists' }, 404)
    }

    await data.delete()

    return success(response, { message: 'Extension Has Been Deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await Extension.find(id)
    if (!data) {
      return badRequest(response, { message: 'Extension Not Exists' })
    }

    return success(response, data, 200)
  }
}
