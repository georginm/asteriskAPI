import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Iax from 'App/Models/Iax'
import Endpoint from 'App/Models/Endpoint'

export default class IaxsController {
  public async index({ response }: HttpContextContract) {
    const data = await Iax.all()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = request.body()

    const dataExists = await Iax.findBy('name', name)

    if (dataExists) {
      return response.badRequest({ message: 'Iax Already Exists' })
    }

    const data = await Iax.create(request.body())

    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Iax.find(id)

    if (!data) {
      return response.badRequest({ message: 'Iax Not Exists' })
    }

    data.merge(request.body())

    await data.save()

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Iax.find(id)

    if (!data) {
      return response.badRequest({ message: 'Iax Not Exists' })
    }

    await data.delete()

    const endpoint = await Endpoint.find(id)
    if (endpoint) {
      await endpoint.delete
    }

    return response.ok({ message: 'Iax Has Been Deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = await Iax.find(id)
    if (!data) {
      return response.badRequest({ message: 'Iax Not Exists' })
    }

    return response.ok(data)
  }
}
