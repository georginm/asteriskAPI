import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class UpdateAuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [rules.maxLength(40)]),
    }),

    username: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    password: schema.string.optional({ trim: true }, [rules.maxLength(80)]),
  })

  public messages = validation
}

export { UpdateAuthValidator }
