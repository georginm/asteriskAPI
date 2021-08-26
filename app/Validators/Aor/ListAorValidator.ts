import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class ListAorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
      rules.minLength(3),
    ]),

    contact: schema.string.optional({ trim: true }, [rules.maxLength(255)]),

    maxContacts: schema.number.optional(),
  })

  public messages = validation
}

export { ListAorValidator }
