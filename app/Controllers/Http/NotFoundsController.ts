import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { notFound } from 'App/Helpers/http-helper';

export default class NotFoundsController {
  public async handle({ response }: HttpContextContract) {
    return notFound(response, 'Page Not Found');
  }
}
