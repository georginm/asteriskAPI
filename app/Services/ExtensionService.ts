import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import ExtensionRepository from 'App/Repositories/ExtensionRepository'
import { destroy } from 'App/utils/database/destroy'

export default class ExtensionService {
  public async index(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<ExtensionRepository[]> {
    const item = await ExtensionRepository.index(page, limit, filter)

    if (!item.length) throw new BadRequestException('Extension not Exists.')

    return item
  }
  public async create(data: any): Promise<ExtensionRepository> {
    await ExtensionRepository.uniquePerExtension(
      data.priority,
      data.context,
      data.exten
    )
    try {
      return await ExtensionRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(id: number, data: any): Promise<ExtensionRepository> {
    await ExtensionRepository.uniquePerExtension(
      data.priority,
      data.context,
      data.exten
    )

    try {
      const item = await ExtensionRepository.findOrFail(id)
      return await item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async destroy(id: string): Promise<boolean> {
    return await destroy(ExtensionRepository.table, 'id', id)
  }

  public async show(id: string): Promise<ExtensionRepository[]> {
    const item = await ExtensionRepository.show(id)

    if (!item.length) throw new BadRequestException('Extension not Exists.')

    return item
  }
}
