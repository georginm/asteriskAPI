import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class ListAuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string.optional({ trim: true }, [
      rules.maxLength(40),
      rules.minLength(3),
    ]),

    username: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
  })

  public messages = validation
}

export { ListAuthValidator }
