import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import QueueMemberRepository from 'App/Repositories/QueueMemberRepository'
import { destroy, exists, unique } from 'App/utils/database'
import { pagination } from 'App/utils/pagination'

export default class QueueMemberService {
  public async index(page: number): Promise<QueueMemberRepository[]> {
    const limit = pagination()
    const data = await QueueMemberRepository.index(page, limit)

    if (!data.length) throw new BadRequestException('Queue Member not Exists.')

    return data
  }

  public async create(data: any): Promise<QueueMemberRepository> {
    data.interface = data.interface.replace('-', '/')

    await unique(QueueMemberRepository.table, 'interface', data.interface)

    await QueueMemberRepository.uniqueByRelationship(
      data.queueName,
      data.interface
    )

    try {
      const item = await QueueMemberRepository.create(data)
      return item
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async destroy(branche: string): Promise<boolean> {
    branche = branche.replace('-', '/')
    return await destroy(QueueMemberRepository.table, 'interface', branche)
  }

  public async show(data: any, page: number): Promise<QueueMemberRepository[]> {
    data = data.replace('-', '/')
    const limit = pagination()

    const item = await QueueMemberRepository.show(data, page, limit)

    if (!item.length) throw new BadRequestException('QueueMember not Exists.')

    return item
  }

  public async update(
    data: any,
    branche: string
  ): Promise<QueueMemberRepository> {
    branche = branche.replace('-', '/')
    await exists(QueueMemberRepository.table, 'interface', branche)

    try {
      const item = await QueueMemberRepository.findOrFail(branche)

      return await item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
