import { Exception } from '@adonisjs/core/build/standalone'
import ExtensionRepository from 'App/Repositories/ExtensionRepository'
import { destroy } from 'App/utils/database/destroy'
import { exists } from 'App/utils/database/exists'

export default class ExtensionService {
  public async create(data): Promise<ExtensionRepository> {
    await ExtensionRepository.uniquePerExtension(
      data.priority,
      data.context,
      data.exten
    )

    try {
      return await ExtensionRepository.create(data)
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async update(id, data): Promise<ExtensionRepository> {
    try {
      const item = await ExtensionRepository.select(id)
      if (!item) {
        throw new Exception('Internal Server Error')
      }

      item.merge(data)

      await item.save()

      return item
    } catch (error) {
      throw new Exception(error, error.status)
    }
  }

  public async destroy(id): Promise<boolean> {
    await exists('extensions', 'id', id)

    try {
      return await destroy('extensions', 'id', id)
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async show(data): Promise<Array<ExtensionRepository>> {
    try {
      return await ExtensionRepository.show(data)
    } catch (error) {
      throw new Exception(error)
    }
  }
}
