import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import QueueMemberRepository from 'App/Repositories/QueueMemberRepository'
import { destroy, exists, unique } from 'App/utils/database'

export default class QueueMemberService {
  public async index(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<QueueMemberRepository[]> {
    const data = await QueueMemberRepository.index(page, limit, filter)

    if (!data.length) throw new BadRequestException('Queue Member not Exists.')

    return data
  }

  public async create(data: any): Promise<QueueMemberRepository> {
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

  public async destroy(id: number): Promise<boolean> {
    return await destroy(QueueMemberRepository.table, 'uniqueid', id)
  }

  public async show(id: number): Promise<QueueMemberRepository[]> {
    const item = await QueueMemberRepository.show(id)

    if (!item.length) throw new BadRequestException('QueueMember not Exists.')

    return item
  }

  public async update(data: any, id: number): Promise<QueueMemberRepository> {
    await exists(QueueMemberRepository.table, 'uniqueid', id)

    try {
      const item = await QueueMemberRepository.findByOrFail('uniqueid', id)

      return await item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
