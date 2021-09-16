import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class CreateRegistrationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string({ trim: true }, [rules.maxLength(40)]),

    authRejectionPermanent: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),
    clientUri: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    contactUser: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    outboundAuth: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    outboundProxy: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),
    serverUri: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    transport: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    endpoint: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    contactHeaderParams: schema.string.optional({ trim: true }, [
      rules.maxLength(255),
    ]),

    expiration: schema.number.optional(),
    maxRetries: schema.number.optional(),
    retryInterval: schema.number.optional(),
    forbiddenRetryInterval: schema.number.optional(),
    fatalRetryInterval: schema.number.optional(),

    supportPath: schema.enum.optional(['yes', 'no'] as const),
    line: schema.enum.optional(['yes', 'no'] as const),
    supportOutbound: schema.enum.optional([
      '0',
      '1',
      'off',
      'on',
      'false',
      'true',
      'no',
      'yes',
    ] as const),
  })

  public messages = validation
}

export { CreateRegistrationValidator }
