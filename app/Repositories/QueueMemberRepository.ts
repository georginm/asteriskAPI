import { Exception } from '@adonisjs/core/build/standalone'
import QueueMember from 'App/Models/QueueMember'

export default class QueueMemberRepository extends QueueMember {
  public static async uniqueByRelationship(
    queue_name: string,
    branche: string
  ): Promise<boolean> {
    const result = await QueueMember.query()
      .where('queue_name', queue_name)
      .where('interface', branche)

    if (result.length) return false
    return true
  }

  public static async show(data) {
    try {
      return await QueueMember.query()
        .where('queue_name', data)
        .orWhere('interface', data)
        .orWhere('membername', data)
        .orderBy('queue_name')
        .orderBy('interface')
    } catch (error) {
      throw new Exception(error, 500)
    }
  }
}
