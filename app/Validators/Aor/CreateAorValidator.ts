import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class CreateAorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string({ trim: true }, [
      rules.maxLength(40),
      rules.minLength(3),
    ]),

    contact: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    outboundProxy: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
    ]),

    supportPath: schema.enum.optional(['yes', 'no'] as const),
    removeExisting: schema.enum.optional(['yes', 'no'] as const),
    authenticateQualify: schema.enum.optional(['yes', 'no'] as const),

    maxContacts: schema.number.optional(),
    maximumExpiration: schema.number.optional(),
    minimumExpiration: schema.number.optional(),
    qualify_timeout: schema.number.optional(),
    qualifyFrequency: schema.number.optional(),
    defaultExpiration: schema.number.optional(),
  })

  public messages = validation
}

export { CreateAorValidator }
