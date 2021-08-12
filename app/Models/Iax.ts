import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Iax extends BaseModel {
  public static table = 'iaxfriends'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public username: string

  @column()
  public secret: string

  @column()
  public context: string

  @column()
  public ipaddr: string

  @column()
  public port: string

  @column()
  public regseconds: string

  @column()
  public host: string

  @column()
  public defaultip: string

  @column()
  public mask: string

  @column()
  public callerid: string

  @column()
  public trunk: string

  @column()
  public auth: string

  @column()
  public maxauthreq: number

  @column()
  public encryption: string

  @column()
  public transfer: string

  @column()
  public disallow: string

  @column()
  public allow: string
}
