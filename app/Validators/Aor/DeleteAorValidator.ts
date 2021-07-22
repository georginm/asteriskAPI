import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validation from 'App/localization/validation'

export default class DeleteAorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({})

  public messages = validation
}
