import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

export default class UpdateExtensionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.number(),
    }),

    context: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    exten: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    priority: schema.number.optional([
      rules.uniquePerRelated({
        table: 'extensions',
        column: 'priority',
        relatedColumn: 'context',
        secondRelatedColumn: 'exten',
      }),
    ]),
    app: schema.string.optional({ trim: true }, [rules.maxLength(40)]),
    appdata: schema.string.optional({ trim: true }, [rules.maxLength(256)]),
  })

  public messages = validation
}
