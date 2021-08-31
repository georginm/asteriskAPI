import { Exception } from '@adonisjs/core/build/standalone'
import QueueMemberRepository from 'App/Repositories/QueueMemberRepository'
import { destroy } from 'App/utils/database/destroy'
import { exists } from 'App/utils/database/exists'
import { unique } from 'App/utils/database/unique'

export default class QueueMemberService {
  public async index(): Promise<QueueMemberRepository[]> {
    try {
      return await QueueMemberRepository.query()
        .orderBy('queue_name')
        .orderBy('interface')
    } catch (error) {
      return error
    }
  }

  public async create(data): Promise<QueueMemberRepository> {
    data.interface = data.interface.replace('-', '/')

    await unique('queue_members', 'interface', data.interface)

    const uniqueByRelarionship =
      await QueueMemberRepository.uniqueByRelarionship(
        data.queueName,
        data.interface
      )

    if (!uniqueByRelarionship)
      throw new Exception(
        'Os campos queue_name e interface devem ser únicos por queue_member.',
        400
      )

    try {
      const item = await QueueMemberRepository.create(data)
      return item
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async destroy(branche: string): Promise<boolean> {
    branche = branche.replace('-', '/')
    return await destroy('queue_members', 'interface', branche)
  }

  public async show(data: any): Promise<QueueMemberRepository[]> {
    data = data.replace('-', '/')

    try {
      return await QueueMemberRepository.show(data)
    } catch (error) {
      return error
    }
  }

  public async update(
    data: any,
    branche: string
  ): Promise<QueueMemberRepository | null> {
    branche = branche.replace('-', '/')
    await exists('queue_members', 'interface', branche)

    try {
      const item = await QueueMemberRepository.find(branche)

      if (!item) {
        return item
      }

      item.merge(data)

      return await item.save()
    } catch (error) {
      throw new Exception(error, 500)
    }
  }
}
