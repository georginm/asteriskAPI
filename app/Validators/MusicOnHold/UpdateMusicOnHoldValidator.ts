import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class UpdateMusicOnHoldValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    param: schema.object().members({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
    }),

    mode: schema.enum.optional([
      'custom',
      'files',
      'mp3nb',
      'quietmp3nb',
      'quietmp3',
      'playlist',
    ] as const),

    directory: schema.string.optional({ trim: true }, [
      rules.maxLength(255),
      rules.regex(/^([\w]*(-)*[\w]*(\/)?){0,15}$/), // /var/as-tasda/assd/aasd/
    ]),

    sort: schema.string.optional({ trim: true }, [rules.maxLength(10)]),

    application: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    digit: schema.string.optional({ trim: true }, [rules.maxLength(1)]),
    format: schema.string.optional({ trim: true }, [rules.maxLength(10)]),
  })

  public messages = validation
}

export { UpdateMusicOnHoldValidator }
