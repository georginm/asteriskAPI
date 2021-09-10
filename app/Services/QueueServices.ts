import BadRequestException from 'App/Exceptions/BadRequestException'
import QueueRepository from 'App/Repositories/QueueRepository'
import { destroy } from 'App/utils/database/destroy'
import { exists } from 'App/utils/database/exists'
import { unique } from 'App/utils/database/unique'

class QueueServices {
  public async index(): Promise<QueueRepository[]> {
    const data = await QueueRepository.all()

    if (!data.length) throw new BadRequestException('Queue not Exists.', 400)

    return data
  }

  public async create(data): Promise<QueueRepository> {
    await unique('queues', 'name', data.name)

    return await QueueRepository.create(data)
  }

  public async update(data, name: string): Promise<QueueRepository | null> {
    await exists('queues', 'name', name)

    const item = await QueueRepository.findOrFail(name)

    return item.merge(data).save()
  }

  public async destroy(name: string): Promise<boolean> {
    return await destroy('queues', 'name', name)
  }

  public async show(data): Promise<QueueRepository[]> {
    const item = await QueueRepository.show(data)

    if (!item.length) throw new BadRequestException('Queue not Exists.', 400)

    return item
  }
}

export { QueueServices }
