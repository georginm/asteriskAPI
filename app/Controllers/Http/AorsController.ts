import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AorServices from 'App/Services/AorServices'
import {
  CreateAorValidator,
  DeleteAorValidator,
  ListAorValidator,
  UpdateAorValidator,
} from 'App/Validators/Aor'

export default class AorsController {
  public async index({ response }: HttpContextContract) {
    const data = await new AorServices().index()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateAorValidator)
    const data = await new AorServices().create(request.body())

    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateAorValidator)
    const data = await new AorServices().update(
      request.body(),
      request.params().id
    )

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteAorValidator)
    await new AorServices().destroy(request.params().id)

    return response.ok({ message: 'Aor has been deleted.' })
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListAorValidator)
    const data = await new AorServices().show(request.params().data)

    return response.ok(data)
  }
}
