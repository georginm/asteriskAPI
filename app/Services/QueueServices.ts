import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import QueueRepository from 'App/Repositories/QueueRepository'
import { destroy, exists, unique } from 'App/utils/database'

export default class QueueServices {
  public async show(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<QueueRepository[]> {
    const data = await QueueRepository.show(page, limit, filter)

    if (!data.length) throw new BadRequestException('Queue not Exists.')

    return data
  }

  public async create(data: any): Promise<QueueRepository> {
    await unique(QueueRepository.table, 'name', data.name)

    try {
      return await QueueRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(data: any, name: string): Promise<QueueRepository> {
    await exists(QueueRepository.table, 'name', name)

    try {
      const item = await QueueRepository.findOrFail(name)

      return item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async destroy(name: string): Promise<boolean> {
    return await destroy(QueueRepository.table, 'name', name)
  }

  public async index(name: string): Promise<QueueRepository[]> {
    const item = await QueueRepository.index(name)

    if (!item.length) throw new BadRequestException('Queue not Exists.')

    return item
  }
}
