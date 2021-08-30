import { Exception } from '@adonisjs/core/build/standalone'
import ExtensionRepository from 'App/Repositories/ExtensionRepository'
import { destroy } from 'App/utils/database/destroy'

export default class ExtensionService {
  public async index(): Promise<ExtensionRepository[]> {
    try {
      return await ExtensionRepository.query()
        .orderBy('context')
        .orderBy('priority')
    } catch (error) {
      return error
    }
  }
  public async create(data): Promise<ExtensionRepository> {
    const unique = await ExtensionRepository.uniquePerExtension(
      data.priority,
      data.context,
      data.exten
    )

    if (!unique)
      throw new Exception(
        'Os campos context, exten e priority devem ser únicos por extension.',
        400
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

  public async destroy(id: string): Promise<boolean> {
    return await destroy('extensions', 'id', id)
  }

  public async show(data): Promise<Array<ExtensionRepository>> {
    try {
      return await ExtensionRepository.show(data)
    } catch (error) {
      throw new Exception(error)
    }
  }
}
