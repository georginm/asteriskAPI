import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Aor extends BaseModel {
  public static table = 'ps_aors'

  @column({ isPrimary: true })
  public id: string

  @column()
  public contact: string

  @column({ columnName: 'outbound_proxy' })
  public outboundProxy: string // varchar 40

  @column({ columnName: 'max_contacts' })
  public maxContacts: number

  @column({ columnName: 'minimum_expiration' })
  public minimumExpiration: number

  @column({ columnName: 'maximum_expiration' })
  public maximumExpiration: number

  @column({ columnName: 'qualify_timeout' })
  public qualify_timeout: number // float8

  @column({ columnName: 'qualify_frequency' })
  public qualifyFrequency: number // int

  @column({ columnName: 'default_expiration' })
  public defaultExpiration: number

  @column({ columnName: 'support_path' })
  public supportPath: string // yesno_values

  @column({ columnName: 'remove_existing' })
  public removeExisting: string // yesno_values

  @column({ columnName: 'authenticate_qualify' })
  public authenticateQualify: string // yesno_values
}
