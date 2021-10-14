import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import QueueMember from 'App/Models/QueueMember'

export default class QueueMemberRepository extends QueueMember {
  public static async uniqueByRelationship(
    queue_name: string,
    branche: string
  ): Promise<boolean> {
    const result = await QueueMember.query()
      .where('queue_name', queue_name)
      .where('interface', branche)

    if (result.length)
      throw new BadRequestException(
        'The queue_name and interface fields must be unique per queue_member.',
        400
      )
    return true
  }

  public static async show(id: number): Promise<QueueMember[]> {
    try {
      return await QueueMember.query().where('uniqueid', id).paginate(1, 1)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<QueueMember[]> {
    try {
      return await QueueMember.query()
        .select('uniqueid', 'queue_name', 'interface', 'membername')
        .if(filter, (query) => {
          query
            .where('queue_name', 'ilike', `%${filter}%`)
            .orWhere('interface', 'ilike', `%${filter}%`)
            .orWhere('membername', 'ilike', `%${filter}%`)
        })
        .orderBy('uniqueid', 'asc')
        .orderBy('queue_name')
        .orderBy('interface')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
