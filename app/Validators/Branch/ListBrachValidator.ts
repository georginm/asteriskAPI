import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class ListBrachValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      data: schema.string({ trim: true }, [rules.maxLength(40)]),
    }),
  })

  public messages = validation
}

export { ListBrachValidator }