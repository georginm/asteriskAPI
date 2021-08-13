import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class ListExtensionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number.optional(),
    context: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    exten: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    priority: schema.number.optional(),
    app: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    appdata: schema.string.optional({ trim: true }, [rules.maxLength(256)]),
  })

  public messages = validation
}

export { ListExtensionValidator }
