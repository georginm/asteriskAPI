import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Extension extends BaseModel {
  public static table = 'extensions'
  @column({ isPrimary: true })
  public id: string

  @column()
  public context: string

  @column()
  public exten: string

  @column()
  public priority: number

  @column()
  public app: string

  @column()
  public appdata: string
}
