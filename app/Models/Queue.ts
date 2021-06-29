import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Queue extends BaseModel {
  public static table = 'queues'

  @column({ isPrimary: true })
  public name: string

  @column({ columnName: 'musiconhold' })
  public musicOnHold: string

  @column({ columnName: 'timeout' })
  public timeOut: string

  @column({ columnName: 'ringinuse' })
  public ringInUse: string

  @column({ columnName: 'monitor_type' })
  public monitorType: string

  @column({ columnName: 'strategy' })
  public strategy: string

  @column({ columnName: 'joinempty' })
  public joinEmpty: string

  @column({ columnName: 'leavewhenempty' })
  public leaveWhenEmpty: string

  @column({ columnName: 'deleted_at' })
  public deletedAt: DateTime
}
