import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

export default class ListAuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string({ trim: true }, [
      rules.maxLength(5),
      rules.minLength(3),
      rules.exists({ table: 'ps_auths', column: 'id' }),
    ]),

    username: schema.string({ trim: true }, [
      rules.maxLength(40),
      rules.unique({ table: 'ps_auths', column: 'username' }),
    ]),
    password: schema.string({ trim: true }, [rules.maxLength(80)]),
  })

  public messages = validation
}
