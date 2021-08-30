import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class QueueMember extends BaseModel {
  public static table = 'queue_members'

  @column({ columnName: 'queue_name' })
  public queueName: string

  @column()
  public interface: string

  @column()
  public membername: string

  @column({ columnName: 'state_interface' })
  public stateInterface: string

  @column()
  public penalty: number

  @column()
  public paused: number

  @column()
  public uniqueid: number

  @column()
  public wrapuptime: number

  @column()
  public ringinuse: string // '0', '1', 'off', 'on', 'false', 'true', 'no', 'yes'
}
