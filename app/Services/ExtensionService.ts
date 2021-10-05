import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import ExtensionRepository from 'App/Repositories/ExtensionRepository'
import { destroy } from 'App/utils/database/destroy'
import { pagination } from 'App/utils/pagination'

export default class ExtensionService {
  public async index(page: number): Promise<ExtensionRepository[]> {
    const limit = pagination()

    const item = await ExtensionRepository.index(page, limit)

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

  public async show(
    data: string,
    page: number
  ): Promise<ExtensionRepository[]> {
    const limit = pagination()
    const item = await ExtensionRepository.show(data, page, limit)
    if (!item.length) throw new BadRequestException('Extension not Exists.')

    return item
  }
}
