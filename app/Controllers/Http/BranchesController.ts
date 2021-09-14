import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BranchService from 'App/Services/BranchService'
import {
  CreateBranchValidator,
  DeleteBranchValidator,
  ListBrachValidator,
  UpdateBranchValidator,
} from 'App/Validators/Branch'

export default class BranchesController {
  public async index({ response }: HttpContextContract) {
    const data = await new BranchService().index()
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateBranchValidator)

    const data = await new BranchService().create(request.body())

    return response.created(data)
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateBranchValidator)

    const data = await new BranchService().update(
      request.body(),
      request.params().id
    )

    return response.ok(data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteBranchValidator)

    await new BranchService().delete(request.params().id)

    return response.ok({ message: 'Branch has been deleted.' })
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListBrachValidator)

    const data = await new BranchService().show(request.params().data)
    return response.ok(data)
  }
}
