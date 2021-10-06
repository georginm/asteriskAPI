import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import IaxRepository from 'App/Repositories/IaxRepository'
import { destroy, exists, unique } from 'App/utils/database'

export default class IaxService {
  public async index(page: number, limit: number): Promise<IaxRepository[]> {
    const data = await IaxRepository.index(page, limit)

    if (!data.length) throw new BadRequestException('Iax not exists.')

    return data
  }

  public async show(
    data: string,
    page: number,
    limit: number
  ): Promise<IaxRepository[]> {
    const item = await IaxRepository.show(data, page, limit)

    if (!item.length) throw new BadRequestException('Iax not exists.')

    return item
  }

  public async create(data: any): Promise<IaxRepository> {
    await unique(IaxRepository.table, 'name', data.name)
    await unique(IaxRepository.table, 'username', data.username)

    try {
      return await IaxRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(data: any, id: number): Promise<IaxRepository> {
    await exists(IaxRepository.table, 'id', id)
    await unique(IaxRepository.table, 'name', data.name)
    await unique(IaxRepository.table, 'username', data.username)

    try {
      const item = await IaxRepository.findOrFail(id)
      return await item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async delete(id: number): Promise<boolean> {
    return await destroy(IaxRepository.table, 'id', id)
  }
}
