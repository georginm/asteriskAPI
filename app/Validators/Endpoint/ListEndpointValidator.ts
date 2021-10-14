import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validator from 'App/localization/validation'

class ListEndpointValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [rules.maxLength(40)]),
    }),
  })

  public messages = validator
}

export { ListEndpointValidator }
