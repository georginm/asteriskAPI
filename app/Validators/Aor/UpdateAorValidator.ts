import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class UpdateAorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [
        rules.maxLength(5),
        rules.minLength(3),
      ]),
    }),

    contact: schema.string.optional({ trim: true }, [rules.maxLength(255)]),

    maxContacts: schema.number.optional(),
  })

  public messages = validation
}

export { UpdateAorValidator }
