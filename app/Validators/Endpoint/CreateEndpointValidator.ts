import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import validation from 'App/localization/validation'

class CreateEndpointValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string({ trim: true }, [rules.maxLength(40)]),

    transport: schema.string({ trim: true }, [rules.maxLength(40)]),
    context: schema.string({ trim: true }, [rules.maxLength(40)]),

    disallow: schema.string({ trim: true }, [
      rules.maxLength(20),
      rules.regex(
        /^(([\w]{3,6})(\s[\w]{3,7})?)(,([\w]{3,6})(\s[\w]{3,7})?){0,12}$/
      ),
      rules.codecExists(),
    ]),

    allow: schema.string({ trim: true }, [
      rules.maxLength(20),
      rules.regex(
        /^(([\w]{3,6})(\s[\w]{3,7})?)(,([\w]{3,6})(\s[\w]{3,7})?){0,12}$/
      ),
      rules.codecExists(),
    ]),

    aors: schema.string({ trim: true }, [rules.maxLength(40)]),

    auth: schema.string({ trim: true }, [rules.maxLength(40)]),

    macAddress: schema.string({ trim: true }, [
      rules.maxLength(17),
      rules.minLength(17),
      rules.regex(/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/),
    ]),

    deny: schema.string.optional({ trim: true }, [
      rules.minLength(7),
      rules.maxLength(95),
      rules.ipList(),
    ]),

    permit: schema.string.optional({ trim: true }, [
      rules.minLength(7),
      rules.maxLength(95),
      rules.ipList(),
    ]),

    contactDeny: schema.string.optional({ trim: true }, [
      rules.minLength(7),
      rules.maxLength(95),
      rules.ipList(),
    ]),

    contactPermit: schema.string.optional({ trim: true }, [
      rules.minLength(7),
      rules.maxLength(95),
      rules.ipList(),
    ]),

    callGroup: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
      rules.callGroupExists(),
    ]),

    pickupGroup: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
      rules.callGroupExists(),
    ]),

    namedCallGroup: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),
    namedPickupGroup: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),

    callerid: schema.string.optional({ trim: true }, [rules.maxLength(40)]),

    // outboundAuth: schema.string.optional({ trim: true }, [rules.maxLength(40)]),

    // outboundProxy: schema.string.optional({ trim: true }, [
    //   rules.maxLength(40),
    // ]),

    rewriteContact: schema.enum(['yes', 'no'] as const),
    rtpSymmetric: schema.enum(['yes', 'no'] as const),
    forceRport: schema.enum(['yes', 'no'] as const),
    directMedia: schema.enum.optional(['yes', 'no'] as const),
    // t38Udptl: schema.enum.optional(['yes', 'no'] as const),
    // t38UdptlNat: schema.enum.optional(['yes', 'no'] as const),
    // disableDirectMediaOnNat: schema.enum.optional(['yes', 'no'] as const),
    // iceSupport: schema.enum.optional(['yes', 'no'] as const),
    // allowOverlap: schema.enum.optional(['yes', 'no'] as const),

    dtmfMode: schema.enum.optional([
      'rfc4733',
      'inband',
      'info',
      'auto',
      'auto_info',
    ] as const),

    rtpTimeout: schema.number.optional(),
    rtpTimeoutHold: schema.number.optional(),
    rtpKeepalive: schema.number.optional(),
    // timersSessExpires: schema.number.optional(),
    // deviceStateBusyAt: schema.number.optional(),
  })

  public messages = validation
}

export { CreateEndpointValidator }
