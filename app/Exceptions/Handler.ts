import Logger from '@ioc:Adonis/Core/Logger'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error.status === 422)
      return ctx.response.unprocessableEntity(error.messages.errors)
    else if (error.status === 404)
      return ctx.response.notFound({ message: error.message })

    return super.handle(error, ctx)
  }
}
