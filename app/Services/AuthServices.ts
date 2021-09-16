import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import AuthRepository from 'App/Repositories/AuthRepository'
import { destroy, exists, unique } from 'App/utils/database/'

export default class AuthServices {
  public async create(data): Promise<AuthRepository> {
    await unique('ps_auths', 'id', data.id, 'id')
    await unique('ps_auths', 'username', data.username, 'username')

    try {
      return await AuthRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(data, id: string): Promise<AuthRepository> {
    await exists('ps_auths', 'id', id, 'id')
    await unique('ps_auths', 'username', data.username, 'username')

    try {
      const item = await AuthRepository.findOrFail(id)
      return await item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
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
    const data = await AuthRepository.index()

    if (!data.length) throw new BadRequestException('Auth not Exists.', 400)

    return data
  }
}
