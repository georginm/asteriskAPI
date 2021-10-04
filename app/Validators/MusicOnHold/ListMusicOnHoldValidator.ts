import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

class ListMusicOnHoldValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    param: schema.object().members({
      data: schema.string({ trim: true }, [rules.maxLength(255)]),
    }),
  })

  public messages = validation
}

export { ListMusicOnHoldValidator }
