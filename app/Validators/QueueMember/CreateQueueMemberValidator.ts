import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class CreateQueueMemberValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    queueName: schema.string({ trim: true }, [rules.maxLength(80)]),
    interface: schema.string({ trim: true }, [rules.maxLength(80)]),

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

export { CreateQueueMemberValidator }
