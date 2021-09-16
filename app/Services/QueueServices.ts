import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import QueueRepository from 'App/Repositories/QueueRepository'
import { destroy, exists, unique } from 'App/utils/database'

export default class QueueServices {
  public async index(): Promise<QueueRepository[]> {
    const data = await QueueRepository.index()

    if (!data.length) throw new BadRequestException('Queue not Exists.')

    return data
  }

  public async create(data): Promise<QueueRepository> {
    await unique(QueueRepository.table, 'name', data.name)

    try {
      return await QueueRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(data, name: string): Promise<QueueRepository | null> {
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

  public async show(data): Promise<QueueRepository[]> {
    const item = await QueueRepository.show(data)

    if (!item.length) throw new BadRequestException('Queue not Exists.')

    return item
  }
}
