import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Identify extends BaseModel {
  public static table = 'ps_endpoint_id_ips'

  @column()
  public id: string

  @column()
  public endpoint: string

  @column()
  public match: string

  @column({ columnName: 'srv_lookups' })
  public srvLookUp: string

  @column({ columnName: 'match_header' })
  public matchHeader: string
}
