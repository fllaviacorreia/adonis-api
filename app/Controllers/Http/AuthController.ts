import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login(ctx: HttpContextContract) {
    const email = ctx.request.input('email')
    const password = ctx.request.input('password')

    try {
      const token = await ctx.auth.use('api').attempt(email, password, {
        expiresIn: '10 days',
      })
      return token.toJSON()
    } catch (error) {
      return ctx.response.unauthorized('Invalid credentials')
    }
  }

  public async register(ctx: HttpContextContract) {
    const newUser = new User()
    newUser.full_name = ctx.request.input('full_name')
    newUser.phone_number = ctx.request.input('phone_number')
    newUser.email = ctx.request.input('email')
    newUser.password = ctx.request.input('password')
    newUser.slug = 'leitor'

    await newUser.save()

    try {
      const token = await ctx.auth
        .use('api')
        .attempt(ctx.request.input('email'), ctx.request.input('password'), {
          expiresIn: '10 days',
        })

      return token.toJSON()
    } catch (error) {
      return error.message
    }
  }
}
