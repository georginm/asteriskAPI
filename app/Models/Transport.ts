import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transport extends BaseModel {
  public static table = 'ps_transports'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'async_operations' })
  public asyncOperations: string

  @column()
  public bind: string

  @column({ columnName: 'ca_list_file' })
  public caListFile: string

  @column({ columnName: 'cert_file' })
  public certFile: string

  @column()
  public cipher: string

  @column()
  public domain: string

  @column({ columnName: 'external_media_address' })
  public externalMediaAddress: string

  @column({ columnName: 'external_signaling_address' })
  public externalSignalingAddress: string

  @column({ columnName: 'external_signaling_port' })
  public externalSignalingPort: number

  @column()
  public method: string

  @column({ columnName: 'local_net' })
  public localNet: string

  @column()
  public password: string

  @column({ columnName: 'priv_key_file' })
  public privKeyFile: string

  @column()
  public protocol: string

  @column({ columnName: 'require_client_cert' })
  public requireClientCert: string

  @column({ columnName: 'verify_client' })
  public verifyClient: string

  @column({ columnName: 'verify_server' })
  public verifyServer: string

  @column()
  public tos: string

  @column()
  public cos: string

  @column({ columnName: 'allow_reload' })
  public allowReload: string

  @column({ columnName: 'symmetric_transport' })
  public symmetricTransport: string
}
