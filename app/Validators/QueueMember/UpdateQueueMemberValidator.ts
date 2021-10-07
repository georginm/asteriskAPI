import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class UpdateQueueMemberValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number(),

    interface: schema.string.optional({ trim: true }, [rules.maxLength(80)]),
    queueName: schema.string.optional({ trim: true }, [rules.maxLength(80)]),

    membername: schema.string.optional({ trim: true }, [rules.maxLength(80)]),
    stateInterface: schema.string.optional({ trim: true }, [
      rules.maxLength(80),
    ]),
    penalty: schema.number.optional(),
    paused: schema.number.optional(),
    wrapuptime: schema.number.optional(),
    ringinuse: schema.string.optional({ trim: true }, [rules.maxLength(5)]),
  })

  public messages = validation
}

export { UpdateQueueMemberValidator }
