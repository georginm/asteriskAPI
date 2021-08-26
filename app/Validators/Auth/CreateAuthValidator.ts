import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class CreateAuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string({ trim: true }, [
      rules.maxLength(40),
      rules.minLength(3),
    ]),
    username: schema.string({ trim: true }, [rules.maxLength(40)]),
    password: schema.string({ trim: true }, [rules.maxLength(80)]),
  })

  public messages = validation
}

export { CreateAuthValidator }
