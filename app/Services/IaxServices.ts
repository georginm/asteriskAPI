import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import IaxRepository from 'App/Repositories/IaxRepository'
import { destroy, unique } from 'App/utils/database'

export default class IaxService {
  public async index(): Promise<IaxRepository[]> {
    const data = await IaxRepository.index()

    if (!data.length) throw new BadRequestException('Iax not exists.', 400)

    return data
  }

  public async show(data): Promise<IaxRepository[]> {
    const item = await IaxRepository.show(data)

    if (!item.length) throw new BadRequestException('Iax not exists.', 400)

    return item
  }

  public async create(data): Promise<IaxRepository> {
    await unique(IaxRepository.table, 'name', data.name)
    await unique(IaxRepository.table, 'username', data.username)

    try {
      return await IaxRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(data, id): Promise<IaxRepository> {
    await unique(IaxRepository.table, 'name', data.name)
    await unique(IaxRepository.table, 'username', data.username)

    try {
      const item = await IaxRepository.findOrFail(id)
      return await item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async delete(id): Promise<boolean> {
    return await destroy(IaxRepository.table, 'id', id)
  }
}
