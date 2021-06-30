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

  @column({ columnName: 'rewrite_contact' })
  public rewriteContact: string

  @column({ columnName: 'rtp_symmetric' })
  public rtpSymmetric: string

  @column({ columnName: 'force_rport' })
  public forceRPort: string

  @column()
  public allow: string

  @column({ columnName: 'direct_media' })
  public directMedia: string

  @column()
  public aors: string

  @column()
  public auth: string

  @column({ columnName: 'mac_address' })
  public macAddress: string
}
