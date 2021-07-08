import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Registration extends BaseModel {
  @column()
  public id: string

  @column({ columnName: 'client_uri' })
  public clientUri: string

  @column({ columnName: 'server_uri' })
  public serverUri: string

  @column({ columnName: 'contact_user' })
  public contactUser: string

  @column()
  public expiration: number

  @column({ columnName: 'outbound_auth' })
  public outboundAuth: string

  @column({ columnName: 'outbound_proxy' })
  public outboundProxy: string

  @column()
  public endpoint: string

  @column()
  public transport: string
}
