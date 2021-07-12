import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class EndpointValidator {
  constructor(protected ctx: HttpContextContract) {}

  public createSchema = schema.create({
    id: schema.string({ trim: true }, [
      rules.maxLength(5),
      rules.minLength(3),
      rules.unique({ table: 'ps_endpoints', column: 'id' }),
    ]),

    transport: schema.enum.optional(['udp', 'tcp', 'tls', 'ws', 'wss']),
    dissallow: schema.string({ trim: true }),
    allow: schema.string({ trim: true }),

    aors: schema.string({ trim: true }, [
      rules.maxLength(5),
      rules.minLength(3),
      rules.unique({ table: 'ps_endpoints', column: 'aors' }),
      rules.exists({ table: 'ps_aors', column: 'id' }),
    ]),

    auth: schema.string({ trim: true }, [
      rules.maxLength(5),
      rules.minLength(3),
      rules.unique({ table: 'ps_endpoints', column: 'auth' }),
      rules.exists({ table: 'ps_auths', column: 'id' }),
    ]),

    macAddress: schema.string({ trim: true }, [
      rules.maxLength(17),
      rules.minLength(17),
      rules.unique({ table: 'ps_endpoints', column: 'mac_address' }),
    ]),

    deny: schema.string.optional({ trim: true }, [
      rules.minLength(7),
      rules.maxLength(95),
    ]),

    permit: schema.string.optional({ trim: true }, [
      rules.minLength(7),
      rules.maxLength(95),
    ]),

    contactDeny: schema.string.optional({ trim: true }, [
      rules.minLength(7),
      rules.maxLength(95),
    ]),

    contactPermit: schema.string.optional({ trim: true }, [
      rules.minLength(7),
      rules.maxLength(95),
    ]),

    callGroup: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    pickupGroup: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    namedCallGroup: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),
    namedPickupGroup: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),

    callerId: schema.string.optional({ trim: true }, [rules.maxLength(40)]),

    outboundAuth: schema.string.optional({ trim: true }, [rules.maxLength(40)]),

    outboundProxy: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),

    rewriteContact: schema.enum.optional(['yes', 'no'] as const),
    rtpSymmetric: schema.enum.optional(['yes', 'no'] as const),
    forceRPort: schema.enum.optional(['yes', 'no'] as const),
    directMedia: schema.enum.optional(['yes', 'no'] as const),
    t38UdpTl: schema.enum.optional(['yes', 'no'] as const),
    t38UdpTlNat: schema.enum.optional(['yes', 'no'] as const),
    disableDirectMediaOnNat: schema.enum.optional(['yes', 'no'] as const),
    iceSupport: schema.enum.optional(['yes', 'no'] as const),
    allowOverlap: schema.enum.optional(['yes', 'no'] as const),

    rtpTimeOut: schema.number.optional(),
    rtpTimeOutHold: schema.number.optional(),
    rtpKeepAlive: schema.number.optional(),
    timersSessExpires: schema.number.optional(),
    deviceStateBusyAt: schema.number.optional(),

    dtmfMode: schema.enum.optional(['rfc4733', 'inband', 'info'] as const),
  })
}
