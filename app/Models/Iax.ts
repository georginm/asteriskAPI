import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Iax extends BaseModel {
  public static table = 'iaxfriends'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: string

  @column({ columnName: 'username' })
  public userName: string

  @column()
  public secret: string

  @column()
  public context: string

  @column()
  public ipaddr: string

  @column()
  public port: string

  @column({ columnName: 'regseconds' })
  public regSeconds: string

  @column()
  public host: string

  @column({ columnName: 'defaultip' })
  public defaultIp: string

  @column()
  public mask: string

  @column({ columnName: 'callerid' })
  public callerId: string

  @column()
  public trunk: string

  @column()
  public auth: string

  @column({ columnName: 'maxauthreq' })
  public maxAuthReq: number

  @column()
  public encryption: string

  @column()
  public transfer: string

  @column()
  public disallow: string

  @column()
  public allow: string
}
