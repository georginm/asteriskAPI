import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class CreateExtensionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    context: schema.string({ trim: true }, [rules.maxLength(40)]),
    exten: schema.string({ trim: true }, [rules.maxLength(40)]),
    priority: schema.number([
      rules.uniquePerRelated({
        table: 'extensions',
        column: 'priority',
        relatedColumn: 'context',
        secondRelatedColumn: 'exten',
      }),
    ]),
    app: schema.string({ trim: true }, [rules.maxLength(40)]),
    appdata: schema.string({ trim: true }, [rules.maxLength(256)]),
  })

  public messages = validation
}

export { CreateExtensionValidator }
