import BadRequestException from 'App/Exceptions/BadRequestException'
import ExtensionRepository from 'App/Repositories/ExtensionRepository'
import { destroy } from 'App/utils/database/destroy'

export default class ExtensionService {
  public async index(): Promise<ExtensionRepository[]> {
    return await ExtensionRepository.query()
      .orderBy('context')
      .orderBy('priority')
  }
  public async create(data): Promise<ExtensionRepository> {
    await ExtensionRepository.uniquePerExtension(
      data.priority,
      data.context,
      data.exten
    )

    return await ExtensionRepository.create(data)
  }

  public async update(id, data): Promise<ExtensionRepository> {
    await ExtensionRepository.uniquePerExtension(
      data.priority,
      data.context,
      data.exten
    )

    const item = await ExtensionRepository.findOrFail(id)

    await item.merge(data).save()

    return item
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
