import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [rules.uuid({ version: '4' })]),
    }),

    email: schema.string.optional({ trim: true }, [rules.email()]),
    cpf: schema.string.optional({ trim: true }, [
      rules.regex(/(\d{3})(.)(\d{3})(.)(\d{3})(-)(\d{2}))/),
    ]),
    fullname: schema.string.optional({ trim: true }),
    password: schema.string.optional({ trim: true }),
  })

  public messages = validation
}
