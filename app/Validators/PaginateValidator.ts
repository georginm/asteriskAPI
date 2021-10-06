import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

export default class PaginateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    limit: schema.number([rules.range(1, 100)]),

    // filter: schema.string.optional({ trim: true }),
  })

  public messages = validation
}
