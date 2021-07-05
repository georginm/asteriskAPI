import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class QueueMember extends BaseModel {
  public static table = 'queue_members'

  @column({ columnName: 'queue_name' })
  public queueName: string

  @column()
  public interface: string

  @column({ columnName: 'membername' })
  public memberName: string

  @column({ columnName: 'state_interface' })
  public stateInterface: string

  @column()
  public penalty: number

  @column()
  public paused: number

  @column({ columnName: 'uniqueid' })
  public uniqueId: number

  @column({ columnName: 'wrapuptime' })
  public wrapUpTime: number
}
