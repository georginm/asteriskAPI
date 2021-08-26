import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class DeleteAorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [
        rules.maxLength(40),
        rules.minLength(3),
      ]),
    }),
  })

  public messages = validation
}

export { DeleteAorValidator }
