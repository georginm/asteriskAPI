import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, notFound, ok } from 'App/Helpers/http-helper'
import Extension from 'App/Models/Extension'

export default class ExtensionsController {
  public async index({ response }: HttpContextContract) {
    const data = await Extension.all()
    return ok(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { id } = request.body()

    const dataExists = await Extension.find(id)

    if (dataExists) {
      return badRequest(response, 'Extension Already Exists')
    }

    const data = await Extension.create(request.body())

    return created(response, data)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Extension.find(id)

    if (!data) {
      return notFound(response, 'Extension Not Exists')
    }

    data.merge(request.body())

    await data.save()

    return ok(response, data)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Extension.find(id)

    if (!data) {
      return notFound(response, 'Extension Not Exists')
    }

    await data.delete()

    return ok(response, { message: 'Extension Has Been Deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await Extension.find(id)
    if (!data) {
      return notFound(response, 'Extension Not Exists')
    }

    return ok(response, data)
  }
}
