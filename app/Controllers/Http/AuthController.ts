import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UsersController from './UsersController'

export default class AuthController {
  public async login(ctx: HttpContextContract) {
    const email = ctx.request.input('email')
    const password = ctx.request.input('password')

    try {
      const token = await auth.use('api').attemp(email, password, {
        expiresIn: '10 days',
      })
      return token.toJSON()
    } catch (error) {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async register(ctx: HttpContextContract) {
    const userController = new UsersController()
    const newUser = userController.createUser(ctx)
    try {
      const token = await auth.use('api').login(newUser, {
        expiresIn: '10 days',
      })
      return token.toJSON()
    } catch (error) {
      return response.unauthorized('Invalid credentials')
    }
  }
}
