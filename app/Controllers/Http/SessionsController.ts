import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.body()

    try {
      const token = await auth
        .use('api')
        .attempt(email, password, { expiresIn: '1day' })
      return response.ok(token)
    } catch (error) {
      return response.badRequest({ message: 'email/password invalid' })
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    try {
      await auth.use('api').revoke()
      return response.noContent()
    } catch (error) {
      return response.badRequest(error.message)
    }
  }
}
