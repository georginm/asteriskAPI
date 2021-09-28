import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    cpf: schema.string({ trim: true }, [
      rules.regex(/(\d{3})(.)(\d{3})(.)(\d{3})(-)(\d{2}))/),
    ]),
    fullname: schema.string({ trim: true }),
    password: schema.string({ trim: true }),
  })

  public messages = validation
}
