import { Exception } from '@adonisjs/core/build/standalone'
import BadRequestException from 'App/Exceptions/BadRequestException'
import QueueMemberRepository from 'App/Repositories/QueueMemberRepository'
import { destroy } from 'App/utils/database/destroy'
import { exists } from 'App/utils/database/exists'
import { unique } from 'App/utils/database/unique'

export default class QueueMemberService {
  public async index(): Promise<QueueMemberRepository[]> {
    return await QueueMemberRepository.query()
      .orderBy('queue_name')
      .orderBy('interface')
  }

  public async create(data): Promise<QueueMemberRepository> {
    data.interface = data.interface.replace('-', '/')

    await unique('queue_members', 'interface', data.interface)

    const uniqueByRelarionship =
      await QueueMemberRepository.uniqueByRelationship(
        data.queueName,
        data.interface
      )

    if (!uniqueByRelarionship)
      throw new Exception(
        'Os campos queue_name e interface devem ser únicos por queue_member.',
        400
      )

    const item = await QueueMemberRepository.create(data)
    return item
  }

  public async destroy(branche: string): Promise<boolean> {
    branche = branche.replace('-', '/')
    return await destroy('queue_members', 'interface', branche)
  }

  public async show(data: any): Promise<QueueMemberRepository[]> {
    data = data.replace('-', '/')

    const item = await QueueMemberRepository.show(data)

    if (!item.length)
      throw new BadRequestException('QueueMember not Exists.', 400)

    return item
  }

  public async update(
    data: any,
    branche: string
  ): Promise<QueueMemberRepository | null> {
    branche = branche.replace('-', '/')
    await exists('queue_members', 'interface', branche)

    const item = await QueueMemberRepository.findOrFail(branche)

    return await item.merge(data).save()
  }
}
