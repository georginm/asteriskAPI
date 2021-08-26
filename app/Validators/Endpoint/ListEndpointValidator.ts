import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validator from 'App/localization/validation'

class ListEndpointValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
      rules.minLength(3),
    ]),

    context: schema.string.optional({ trim: true }, [rules.maxLength(40)]),

    disallow: schema.string.optional({ trim: true }, [
      rules.maxLength(20),
      rules.regex(
        /^(([\w]{3,6})(\s[\w]{3,7})?)(,([\w]{3,6})(\s[\w]{3,7})?){0,12}$/
      ),
      rules.codecExists(),
    ]),

    allow: schema.string.optional({ trim: true }, [
      rules.maxLength(20),
      rules.regex(
        /^(([\w]{3,6}\s?([\w]{3,7})?))(,([\w]{3,6}\s?([\w]{3,7})?)){0,12}$/
      ),
      rules.codecExists(),
    ]),

    aors: schema.string.optional({ trim: true }, [
      rules.maxLength(5),
      rules.minLength(3),
    ]),

    auth: schema.string.optional({ trim: true }, [
      rules.maxLength(5),
      rules.minLength(3),
    ]),

    macAddress: schema.string.optional({ trim: true }, [
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

    transport: schema.enum.optional(['udp', 'tcp', 'tls', 'ws', 'wss']),

    dtmf_mode: schema.enum.optional([
      'rfc4733',
      'inband',
      'info',
      'auto',
      'auto_info',
    ] as const),
  })

  public messages = validator
}

export { ListEndpointValidator }
