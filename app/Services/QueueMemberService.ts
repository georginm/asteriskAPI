import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import QueueMemberRepository from 'App/Repositories/QueueMemberRepository'
import { destroy, exists, unique } from 'App/utils/database'

export default class QueueMemberService {
  public async index(): Promise<QueueMemberRepository[]> {
    const data = await QueueMemberRepository.index()

    if (!data.length) throw new BadRequestException('Queue Member not Exists.')

    return data
  }

  public async create(data): Promise<QueueMemberRepository> {
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

  public async show(data: any): Promise<QueueMemberRepository[]> {
    data = data.replace('-', '/')

    const item = await QueueMemberRepository.show(data)

    if (!item.length) throw new BadRequestException('QueueMember not Exists.')

    return item
  }

  public async update(
    data: any,
    branche: string
  ): Promise<QueueMemberRepository | null> {
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
