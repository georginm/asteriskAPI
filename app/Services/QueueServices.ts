import { Exception } from '@adonisjs/core/build/standalone'
import QueueRepository from 'App/Repositories/QueueRepository'
import { destroy } from 'App/utils/database/destroy'
import { exists } from 'App/utils/database/exists'
import { unique } from 'App/utils/database/unique'

class QueueServices {
  public async index(): Promise<QueueRepository[]> {
    return await QueueRepository.all()
  }

  public async create(data): Promise<QueueRepository> {
    await unique('queues', 'name', data.name)

    try {
      return await QueueRepository.create(data)
    } catch (error) {
      throw new Exception(error)
    }
  }

  public async update(data, name: string): Promise<QueueRepository | null> {
    await exists('queues', 'name', name)

    try {
      const item = await QueueRepository.find(name)

      if (!item) {
        return item
      }

      item.merge(data)

      return await item.save()
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async destroy(name: string): Promise<boolean> {
    return await destroy('queues', 'name', name)
  }

  public async show(data): Promise<QueueRepository[]> {
    try {
      return await QueueRepository.show(data)
    } catch (error) {
      throw new Exception(error, 500)
    }
  }
}

export { QueueServices }
