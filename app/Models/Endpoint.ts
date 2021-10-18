import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Endpoint extends BaseModel {
  public static table = 'ps_endpoints'

  @column({ isPrimary: true })
  public id: string // max lenght 40

  @column()
  public transport: string // max lenght 40

  @column()
  public context: string // max lenght 40

  @column()
  public disallow: string // max lenght 200

  @column()
  public allow: string // max lenght 200

  @column({ columnName: 'rewrite_contact' })
  public rewriteContact: string // yes/no

  @column({ columnName: 'rtp_symmetric' })
  public rtpSymmetric: string // yes/no

  @column({ columnName: 'force_rport' })
  public forceRport: string // yes/no

  @column({ columnName: 'direct_media' })
  public directMedia: string // yes/no

  @column()
  public aors: string // max lenght 200

  @column()
  public auth: string // max lenght 40

  @column({ columnName: 'mac_address' })
  public macAddress: string // max lenght 18

  // @column({ columnName: 't38_udptl' })
  // public t38Udptl: string // yes/no

  // @column({ columnName: 't38_udptl_nat' })
  // public t38UdptlNat: string // yes/no

  @column({ columnName: 'rtp_timeout' })
  public rtpTimeout: number

  @column({ columnName: 'rtp_timeout_hold' })
  public rtpTimeoutHold: number

  @column({ columnName: 'rtp_keepalive' })
  public rtpKeepalive: number

  @column({ columnName: 'dtmf_mode' })
  public dtmfMode: string

  // @column({ columnName: 'timers_sess_expires' })
  // public timersSessExpires: number

  // @column({ columnName: 'disable_direct_media_on_nat' }) // yes/no
  // public disableDirectMediaOnNat: string

  // @column({ columnName: 'ice_support' })
  // public iceSupport: string // yes/no

  // @column({ columnName: 'allow_overlap' })
  // public allowOverlap: string //yes/no

  @column()
  public deny: string

  @column()
  public permit: string

  @column({ columnName: 'contact_deny' })
  public contactDeny: string

  @column({ columnName: 'contact_permit' })
  public contactPermit: string

  // @column({ columnName: 'device_state_busy_at' })
  // public deviceStateBusyAt: number

  @column({ columnName: 'call_group' })
  public callGroup: string

  @column({ columnName: 'pickup_group' })
  public pickupGroup: string

  @column({ columnName: 'named_call_group' })
  public namedCallGroup: string

  @column({ columnName: 'named_pickup_group' })
  public namedPickupGroup: string

  @column()
  public callerid: string

  // @column({ columnName: 'outbound_auth' })
  // public outboundAuth: string

  // @column({ columnName: 'outbound_proxy' })
  // public outboundProxy: string
}
