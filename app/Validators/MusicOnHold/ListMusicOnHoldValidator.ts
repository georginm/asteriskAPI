import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class ListMusicOnHoldValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      name: schema.string({ trim: true }, [rules.maxLength(255)]),
    }),
  })

  public messages = validation
}

export { ListMusicOnHoldValidator }
