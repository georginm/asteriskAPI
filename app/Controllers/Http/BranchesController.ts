import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BranchService from 'App/Services/BranchService'
import {
  CreateBranchValidator,
  DeleteBranchValidator,
  ListBrachValidator,
  UpdateBranchValidator,
} from 'App/Validators/Branch'
import PaginateValidator from 'App/Validators/PaginateValidator'

export default class BranchesController {
  public async index({ response, request }: HttpContextContract) {
    await request.validate(PaginateValidator)

    const { limit = 10, page = 1, filter = null } = request.all()

    const data = await new BranchService().index(page, limit, filter)
    return response.ok(data)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateBranchValidator)

    const data = await new BranchService().create(request.body())

    return response.created({ data })
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateBranchValidator)

    const data = await new BranchService().update(
      request.body(),
      request.params().id
    )

    return response.ok({ data })
  }

  public async destroy({ request, response }: HttpContextContract) {
    await request.validate(DeleteBranchValidator)

    await new BranchService().delete(request.params().id)

    return response.ok({ message: 'Branch has been deleted.' })
  }

  public async show({ request, response }: HttpContextContract) {
    await request.validate(ListBrachValidator)

    const data = await new BranchService().show(request.params().id)
    return response.ok(data)
  }
}
