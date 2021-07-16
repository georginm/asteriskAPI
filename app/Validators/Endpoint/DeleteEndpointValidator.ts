import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

export default class DeleteEndpointValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    params: schema.object().members({
      id: schema.string({ trim: true }, [
        rules.maxLength(5),
        rules.minLength(3),
        rules.exists({ table: 'ps_endpoints', column: 'id' }),
      ]),
    }),
  })

  public messages = validation
}
