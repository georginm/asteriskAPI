import BadRequestException from 'App/Exceptions/BadRequestException'
import AuthRepository from 'App/Repositories/AuthRepository'
import { destroy } from 'App/utils/database/destroy'
import { exists } from 'App/utils/database/exists'
import { unique } from 'App/utils/database/unique'

export default class AuthServices {
  public async create(data): Promise<AuthRepository> {
    await unique('ps_auths', 'id', data.id, 'id')
    await unique('ps_auths', 'username', data.username, 'username')

    return await AuthRepository.create(data)
  }

  public async update(data, id: string): Promise<AuthRepository> {
    await exists('ps_auths', 'id', id, 'id')
    await unique('ps_auths', 'username', data.username, 'username')

    const item = await AuthRepository.findOrFail(id)

    await item.merge(data).save()

    return item
  }

  public async destroy(id: string): Promise<boolean> {
    return await destroy('ps_auths', 'id', id)
  }

  public async show(data): Promise<Array<AuthRepository>> {
    const item = await AuthRepository.show(data)

    if (!item.length) throw new BadRequestException('Auth not Exists.', 400)

    return item
  }

  public async index(): Promise<Array<AuthRepository>> {
    const data = await AuthRepository.all()
    if (!data.length) throw new BadRequestException('Auth not Exists.', 400)

    return data
  }
}
