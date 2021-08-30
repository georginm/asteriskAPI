import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

class DeleteQueueValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      name: schema.string({ trim: true }, [rules.maxLength(128)]),
    }),
  })

  public messages = {}
}

export { DeleteQueueValidator }
