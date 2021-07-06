import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, success } from 'App/Helpers/http-helper'
import Aor from 'App/Models/Aor'
import Endpoint from 'App/Models/Endpoint'

export default class AorsController {
  /**
   *
   * @param HttpContextContract
   * @returns reponse
   */
  public async index({ response }: HttpContextContract) {
    const data = await Aor.all()
    return success(response, data)
  }

  /**
   *
   * @param HttpContextContract
   * @returns reponse
   */
  public async store({ request, response }: HttpContextContract) {
    const { id } = request.body()
    const dataExists = await Aor.find(id)

    if (dataExists) {
      return badRequest(response, 'Aor Already Exists')
    }

    const data = await Aor.create(request.body())

    return created(response, data)
  }

  /**
   *
   * @param HttpContextContract
   * @returns response
   */
  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Aor.find(id)

    if (!data) {
      return badRequest(response, 'Aor Not Exists')
    }

    data.merge(request.body())

    await data.save()

    return success(response, data)
  }

  /**
   *
   * @param HttpContextContract
   * @returns response
   */
  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Aor.find(id)

    if (!data) {
      return badRequest(response, 'Aor Not Exists')
    }

    await data.delete()

    const endpoint = await Endpoint.find(id)
    if (endpoint) {
      await endpoint.delete()
    }

    return success(response, { message: 'Aor Has Been Deleted' })
  }

  /**
   *
   * @param HttpContextContract
   * @returns
   */
  public async list({ request, response }: HttpContextContract) {
    const where = request.qs()
    const data = await Aor.query().where(where)
    if (!data) {
      return badRequest(response, 'Aor Not Exists')
    }

    return success(response, data)
  }
}
