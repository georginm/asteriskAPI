import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import ExtensionRepository from 'App/Repositories/ExtensionRepository'
import { destroy } from 'App/utils/database/destroy'

export default class ExtensionService {
  public async index(): Promise<ExtensionRepository[]> {
    const item = await ExtensionRepository.index()

    if (!item.length) throw new BadRequestException('Extension not Exists.')

    return item
  }
  public async create(data): Promise<ExtensionRepository> {
    await ExtensionRepository.uniquePerExtension(
      data.priority,
      data.context,
      data.exten
    )
    try {
      return await ExtensionRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message, 500)
    }
  }

  public async update(id, data): Promise<ExtensionRepository> {
    await ExtensionRepository.uniquePerExtension(
      data.priority,
      data.context,
      data.exten
    )

    try {
      const item = await ExtensionRepository.findOrFail(id)
      return await item.merge(data).save()
    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(error.message, 500)
    }
  }

  public async destroy(id: string): Promise<boolean> {
    return await destroy('extensions', 'id', id)
  }

  public async show(data): Promise<Array<ExtensionRepository>> {
    const item = await ExtensionRepository.show(data)
    if (!item.length) throw new BadRequestException('Extension not Exists.')

    return item
  }
}
