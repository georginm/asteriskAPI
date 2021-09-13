import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InternalServerErrorException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.internalServerError({ message: error.message })
  }
}
