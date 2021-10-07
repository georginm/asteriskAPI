import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class UpdateQueueValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(128)]),

    context: schema.string.optional({ trim: true }, [rules.maxLength(128)]),
    joinempty: schema.string.optional({ trim: true }, [rules.maxLength(128)]),
    leavewhenempty: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    monitorType: schema.string.optional({ trim: true }, [rules.maxLength(128)]),
    musiconhold: schema.string.optional({ trim: true }, [rules.maxLength(128)]),

    timeout: schema.number.optional(),
    wrapuptime: schema.number.optional(),

    ringinuse: schema.enum.optional(['yes', 'no'] as const),

    strategy: schema.enum.optional([
      'ringall',
      'leastrecent',
      'fewestcalls',
      'random',
      'rrmemory',
      'linear',
      'wrandom',
      'rrordered',
    ] as const),

    setinterfacevar: schema.enum.optional(['yes', 'no'] as const),
    setqueuevar: schema.enum.optional(['yes', 'no'] as const),
    setqueueentryvar: schema.enum.optional(['yes', 'no'] as const),
    announceToFirstUser: schema.enum.optional(['yes', 'no'] as const),
    relativePeriodicAnnounce: schema.enum.optional(['yes', 'no'] as const),
    randomPeriodicAnnounce: schema.enum.optional(['yes', 'no'] as const),
    autofill: schema.enum.optional(['yes', 'no'] as const),
    autopausebusy: schema.enum.optional(['yes', 'no'] as const),
    autopauseunavail: schema.enum.optional(['yes', 'no'] as const),
    reportholdtime: schema.enum.optional(['yes', 'no'] as const),
    timeoutrestart: schema.enum.optional(['yes', 'no'] as const),

    announceFrequency: schema.number.optional(),
    minAnnounceFrequency: schema.number.optional(),
    announceRoundSeconds: schema.number.optional(),
    announcePositionLimit: schema.number.optional(),
    periodicAnnounceFrequency: schema.number.optional(),
    retry: schema.number.optional(),
    penaltymemberslimit: schema.number.optional(),
    maxlen: schema.number.optional(),
    servicelevel: schema.number.optional(),
    memberdelay: schema.number.optional(),
    weight: schema.number.optional(),

    announce: schema.string.optional({ trim: true }, [rules.maxLength(128)]),
    monitorFormat: schema.string.optional({ trim: true }, [rules.maxLength(8)]),
    membermacro: schema.string.optional({ trim: true }, [rules.maxLength(512)]),
    membergosub: schema.string.optional({ trim: true }, [rules.maxLength(512)]),

    queueYouarenext: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    queueThereare: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    queueCallswaiting: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    queue_quantity1: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    queue_quantity2: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    queueHoldtime: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    queueMinutes: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    queueMinute: schema.string.optional({ trim: true }, [rules.maxLength(128)]),
    queueSeconds: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    queueThankyou: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    queueCallerannounce: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    queueReporthold: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    announceHoldtime: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    announcePosition: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
    periodicAnnounce: schema.string.optional({ trim: true }, [
      rules.maxLength(50),
    ]),
    defaultrule: schema.string.optional({ trim: true }, [rules.maxLength(128)]),
    timeoutpriority: schema.string.optional({ trim: true }, [
      rules.maxLength(128),
    ]),
  })

  public messages = validation
}

export { UpdateQueueValidator }
