import { Exception } from '@adonisjs/core/build/standalone'
import ExtensionRepository from 'App/Repositories/ExtensionRepository'

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

}
