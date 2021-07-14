import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import validation from 'App/localization/validation'

export default class CreateEndpointValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string({ trim: true }, [
      rules.maxLength(5),
      rules.minLength(3),
      rules.unique({ table: 'ps_endpoints', column: 'id' }),
    ]),

    transport: schema.enum(['udp', 'tcp', 'tls', 'ws', 'wss']),
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
        /^(([\w]{3,6}\s?([\w]{3,7})?))(,([\w]{3,6}\s?([\w]{3,7})?)){0,12}$/
      ),
      rules.codecExists(),
    ]),

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

    mac_address: schema.string({ trim: true }, [
      rules.maxLength(17),
      rules.minLength(17),
      rules.unique({ table: 'ps_endpoints', column: 'mac_address' }),
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

    contact_deny: schema.string.optional({ trim: true }, [
      rules.minLength(7),
      rules.maxLength(95),
      rules.ipList(),
    ]),

    contact_permit: schema.string.optional({ trim: true }, [
      rules.minLength(7),
      rules.maxLength(95),
      rules.ipList(),
    ]),

    call_group: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
      rules.callGroupExists(),
    ]),

    pickup_group: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
      rules.callGroupExists(),
    ]),

    named_call_group: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),
    named_pickup_group: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),

    callerid: schema.string.optional({ trim: true }, [rules.maxLength(40)]),

    outbound_auth: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),

    outbound_proxy: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),

    rewrite_contact: schema.enum.optional(['yes', 'no'] as const),
    rtp_symmetric: schema.enum.optional(['yes', 'no'] as const),
    force_rport: schema.enum.optional(['yes', 'no'] as const),
    direct_media: schema.enum.optional(['yes', 'no'] as const),
    t38_udptl: schema.enum.optional(['yes', 'no'] as const),
    t38_udptl_nat: schema.enum.optional(['yes', 'no'] as const),
    disable_direct_media_on_nat: schema.enum.optional(['yes', 'no'] as const),
    ice_support: schema.enum.optional(['yes', 'no'] as const),
    allow_overlap: schema.enum.optional(['yes', 'no'] as const),

    dtmf_mode: schema.enum.optional([
      'rfc4733',
      'inband',
      'info',
      'auto',
      'auto_info',
    ] as const),

    rtp_timeout: schema.number.optional(),
    rtp_timeout_hold: schema.number.optional(),
    rtp_keepalive: schema.number.optional(),
    timers_sess_expires: schema.number.optional(),
    device_state_busy_at: schema.number.optional(),
  })

  public messages = validation
}
