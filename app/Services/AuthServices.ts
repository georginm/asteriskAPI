import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import AuthRepository from 'App/Repositories/AuthRepository'
import { destroy, exists, unique } from 'App/utils/database/'
export default class AuthServices {
  public async create(data: any): Promise<AuthRepository> {
    await unique(AuthRepository.table, 'id', data.id, 'id')
    await unique(AuthRepository.table, 'username', data.username, 'username')

    try {
      return await AuthRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(data: any, id: string): Promise<AuthRepository> {
    await exists(AuthRepository.table, 'id', id, 'id')
    await unique(AuthRepository.table, 'username', data.username, 'username')

    try {
      const item = await AuthRepository.findOrFail(id)
      return await item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async destroy(id: string): Promise<boolean> {
    return await destroy(AuthRepository.table, 'id', id)
  }

  public async show(id: string): Promise<AuthRepository[]> {
    const item = await AuthRepository.show(id)

    if (!item.length) throw new BadRequestException('Auth not Exists.')

    return item
  }

  public async index(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<AuthRepository[]> {
    const data = await AuthRepository.index(page, limit, filter)

    if (!data.length) throw new BadRequestException('Auth not Exists.')

    return data
  }
}
