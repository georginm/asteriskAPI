import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class DeleteQueueMemberValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      interface: schema.string({ trim: true }, [rules.maxLength(80)]),
    }),
  })

  public messages = validation
}

export { DeleteQueueMemberValidator }
