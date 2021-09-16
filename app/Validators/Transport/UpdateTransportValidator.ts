import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class UpdateTransportValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [rules.maxLength(40)]),
    }),

    bind: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    protocol: schema.enum.optional(['udp', 'tcp', 'tls', 'ws', 'wss', 'flow']),

    password: schema.string.optional({ trim: true }, [rules.maxLength(40)]),

    asyncOperations: schema.number.optional(),
    externalSignalingPort: schema.number.optional(),

    tos: schema.string.optional({ trim: true }, [rules.maxLength(10)]),
    caListFile: schema.string.optional({ trim: true }, [rules.maxLength(200)]),
    certFile: schema.string.optional({ trim: true }, [rules.maxLength(200)]),
    cipher: schema.string.optional({ trim: true }, [rules.maxLength(200)]),
    privKeyFile: schema.string.optional({ trim: true }, [rules.maxLength(200)]),
    domain: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
      rules.ipList(),
    ]),
    externalMediaAddress: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
      rules.ipList(),
    ]),
    externalSignalingAddress: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
      rules.ipList(),
    ]),
    localNet: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
      rules.ipList(),
    ]),

    requireClientCert: schema.enum.optional(['yes', 'no']),
    verifyClient: schema.enum.optional(['yes', 'no']),
    verifyServer: schema.enum.optional(['yes', 'no']),
    allowReload: schema.enum.optional(['yes', 'no']),
    symmetricTransport: schema.enum.optional(['yes', 'no']),

    method: schema.enum.optional(['udp', 'tcp', 'tls', 'ws', 'wss', 'flow']),
  })

  public messages = validation
}

export { UpdateTransportValidator }
