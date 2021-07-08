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

  @column({ columnName: 't38_udptl' })
  public t38UdpTl: string

  @column({ columnName: 't38_udptl_nat' })
  public t38UdpTlNat: string

  @column({ columnName: 'rtp_timeout' })
  public rtpTimeOut: number

  @column({ columnName: 'rtp_timeout_hold' })
  public rtpTimeOutHold: number

  @column({ columnName: 'rtp_keepalive' })
  public rtpKeepAlive: number

  @column({ columnName: 'dtmf_mode' })
  public dtmfMode: string

  @column({ columnName: 'timers_sess_expires' })
  public timersSessExpires: number

  @column({ columnName: 'disable_direct_media_on_nat' }) // yes/no
  public disableDirectMediaOnNat: string

  @column({ columnName: 'ice_support' })
  public iceSupport: string // yes/no

  @column({ columnName: 'allow_overlap' })
  public allowOverlap: string //yes/no

  @column()
  public deny: string

  @column()
  public permit: string

  @column({ columnName: 'contact_deny' })
  public contactDeny: string

  @column({ columnName: 'contact_permit' })
  public contactPermit: string

  @column({ columnName: 'device_state_busy_at' })
  public deviceStateBusyAt: number

  @column({ columnName: 'call_group' })
  public callGroup: string

  @column({ columnName: 'pickup_group' })
  public pickupGroup: string

  @column({ columnName: 'named_call_group' })
  public namedCallGroup: string

  @column({ columnName: 'callerid' })
  public callerId: string

  @column({ columnName: 'outbound_auth' })
  public outboundAuth: string

  @column({ columnName: 'outbound_proxy' })
  public outboundProxy: string
}
