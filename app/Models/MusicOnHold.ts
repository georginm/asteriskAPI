import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MusicOnHold extends BaseModel {
  public static table = 'musiconhold'

  @column({ isPrimary: true })
  public name: string

  @column()
  public mode: string // moh values

  @column()
  public directory: string

  @column()
  public application: string

  @column()
  public digit: string

  @column()
  public sort: string

  @column()
  public format: string

  @column()
  public stamp: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
