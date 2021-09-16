import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Registration extends BaseModel {
  public static table = 'ps_registrations'

  @column()
  public id: string

  @column({ columnName: 'auth_rejection_permanent' })
  public authRejectionPermanent: string

  @column({ columnName: 'client_uri' })
  public clientUri: string

  @column({ columnName: 'contact_user' })
  public contactUser: string

  @column()
  public expiration: number

  @column({ columnName: 'max_retries' })
  public maxRetries: number

  @column({ columnName: 'outbound_auth' })
  public outboundAuth: string

  @column({ columnName: 'outbound_proxy' })
  public outboundProxy: string

  @column({ columnName: 'retry_interval' })
  public retryInterval: number

  @column({ columnName: 'forbidden_retry_interval' })
  public forbiddenRetryInterval: number

  @column({ columnName: 'server_uri' })
  public serverUri: string

  @column()
  public transport: string

  @column({ columnName: 'support_path' })
  public supportPath: string

  @column({ columnName: 'fatal_retry_interval' })
  public fatalRetryInterval: number

  @column()
  public line: string

  @column()
  public endpoint: string

  @column({ columnName: 'support_outbound' })
  public supportOutbound: string

  @column({ columnName: 'contact_header_params' })
  public contactHeaderParams: string
}
