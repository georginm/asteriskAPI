import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Endpoint extends BaseModel {
  public static table = 'ps_endpoints'

  @column({ isPrimary: true })
  public id: string

  @column()
  public transport: string

  @column()
  public context: string

  @column()
  public disallow: string

  @column()
  public rewrite_contact: string

  @column()
  public rtp_symmetric: string

  @column()
  public force_rport: string

  @column()
  public allow: string

  @column()
  public direct_media: string

  @column()
  public aors: string

  @column()
  public auth: string
}
