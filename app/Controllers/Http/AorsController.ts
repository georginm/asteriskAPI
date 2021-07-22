import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aor from 'App/Models/Aor'
import CreateAorValidator from 'App/Validators/Aor/CreateAorValidator'

export default class AorsController {
  public async index({ response }: HttpContextContract) {
    const data = await Aor.all()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const validator = await request.validate(CreateAorValidator)

      const data = await Aor.create(validator)

      return response.created(data)
    } catch (error) {
      return response.badRequest(error.messages.errors)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Aor.find(id)

    if (!data) {
      return response.badRequest({ message: 'aor not exists' })
    }

    data.merge(request.body())

    await data.save()

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Aor.find(id)

    if (!data) {
      return response.badRequest({ message: 'aor not exists' })
    }

    await data.delete()

    return response.ok({ message: 'aor has been deleted' })
  }

  public async list({ request, response }: HttpContextContract) {
    const where = request.qs()
    const data = await Aor.query().where(where)
    if (!data.length) {
      return response.badRequest({ message: 'aor not exists' })
    }

    return response.ok(data)
  }
}
