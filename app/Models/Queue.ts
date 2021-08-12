import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Queue extends BaseModel {
  public static table = 'queues'

  @column({ isPrimary: true })
  public name: string

  @column()
  public musiconhold: string

  @column()
  public timeout: string

  @column()
  public ringinuse: string

  @column({ columnName: 'monitor_type' })
  public monitorType: string

  @column()
  public strategy: string

  @column()
  public joinempty: string

  @column()
  public leavewhenempty: string

  @column({ columnName: 'deleted_at' })
  public deletedAt: DateTime | null
}
