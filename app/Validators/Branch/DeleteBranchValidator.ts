import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class DeleteBranchValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [
        rules.maxLength(40),
        rules.regex(/[0-9]{2,}/),
      ]),
    }),
  })

  public messages = validation
}

export { DeleteBranchValidator }
