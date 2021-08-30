import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Queue extends BaseModel {
  public static table = 'queues'

  @column({ isPrimary: true })
  public name: string

  @column()
  public musiconhold: string

  @column()
  public announce: string

  @column()
  public context: string

  @column()
  public timeout: number

  @column()
  public ringinuse: string

  @column()
  public setinterfacevar: string // yesno

  @column()
  public setqueuevar: string // yesno

  @column()
  public setqueueentryvar: string // yesno

  @column({ columnName: 'monitor_format' })
  public monitorFormat: string

  @column()
  public membermacro: string

  @column()
  public membergosub: string

  @column({ columnName: 'queue_youarenext' })
  public queueYouarenext: string

  @column({ columnName: 'queue_thereare' })
  public queueThereare: string

  @column({ columnName: 'queue_callswaiting' })
  public queueCallswaiting: string

  @column({ columnName: 'queue_quantity1' })
  public queue_quantity1: string

  @column({ columnName: 'queue_quantity2' })
  public queue_quantity2: string

  @column({ columnName: 'queue_holdtime' })
  public queueHoldtime: string

  @column({ columnName: 'queue_minutes' })
  public queueMinutes: string

  @column({ columnName: 'queue_minute' })
  public queueMinute: string

  @column({ columnName: 'queue_seconds' })
  public queueSeconds: string

  @column({ columnName: 'queue_thankyou' })
  public queueThankyou: string

  @column({ columnName: 'queue_callerannounce' })
  public queueCallerannounce: string

  @column({ columnName: 'queue_reporthold' })
  public queueReporthold: string

  @column({ columnName: 'announce_frequency' })
  public announceFrequency: number

  @column({ columnName: 'announce_to_first_user' })
  public announceToFirstUser: string

  @column({ columnName: 'min_announce_frequency' })
  public minAnnounceFrequency: number

  @column({ columnName: 'announce_round_seconds' })
  public announceRoundSeconds: number

  @column({ columnName: 'announce_holdtime' })
  public announceHoldtime: string

  @column({ columnName: 'announce_position' })
  public announcePosition: string

  @column({ columnName: 'announce_position_limit' })
  public announcePositionLimit: number

  @column({ columnName: 'periodic_announce' })
  public periodicAnnounce: string

  @column({ columnName: 'periodic_announce_frequency' })
  public periodicAnnounceFrequency: number

  @column({ columnName: 'relative_periodic_announce' })
  public relativePeriodicAnnounce: string

  @column({ columnName: 'random_periodic_announce' })
  public randomPeriodicAnnounce: string

  @column({ columnName: 'retry' })
  public retry: number

  @column({ columnName: 'wrapuptime' })
  public wrapuptime: number

  @column({ columnName: 'penaltymemberslimit' })
  public penaltymemberslimit: number

  @column({ columnName: 'autofill' })
  public autofill: string

  @column({ columnName: 'monitor_type' })
  public monitorType: string

  @column({ columnName: 'autopause' })
  public autopause: string

  @column({ columnName: 'autopausedelay' })
  public autopausedelay: number

  @column({ columnName: 'autopausebusy' })
  public autopausebusy: string

  @column({ columnName: 'autopauseunavail' })
  public autopauseunavail: string

  @column({ columnName: 'maxlen' })
  public maxlen: number

  @column({ columnName: 'servicelevel' })
  public servicelevel: number

  @column()
  public strategy: string

  @column()
  public joinempty: string

  @column()
  public leavewhenempty: string

  @column({ columnName: 'reportholdtime' })
  public reportholdtime: string

  @column({ columnName: 'memberdelay' })
  public memberdelay: number

  @column({ columnName: 'weight' })
  public weight: number

  @column({ columnName: 'timeoutrestart' })
  public timeoutrestart: string

  @column({ columnName: 'defaultrule' })
  public defaultrule: string

  @column({ columnName: 'timeoutpriority' })
  public timeoutpriority: string

  @column({ columnName: 'deleted_at' })
  public deletedAt: DateTime | null
}
