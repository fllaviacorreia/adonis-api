import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UsersController {
  public async showAll() {
    const users = await Database.query().from('users').select('*')
    // const user = await User.all
    return users
  }

  public async showOne(ctx: HttpContextContract) {
    const user = await User.find(ctx.params.id) //exclui password
    if (user) {
      return user
    }
    return 'not found'
  }

  //   ao invés desse argumento, pode ser {request}: HttpContextContract
  public async createUser(ctx: HttpContextContract) {
    const newUser = new User()
    newUser.full_name = ctx.request.input('full_name')
    newUser.phone_number = ctx.request.input('phone_number')
    newUser.email = ctx.request.input('email')
    newUser.password = ctx.request.input('password')
    newUser.slug = ctx.request.input('slug')
    await newUser.save()
    return 'created'
  }

  public async editUser(ctx: HttpContextContract) {
    const user = await User.find(ctx.params.id)
    if (user) {
      user.full_name = ctx.request.input('full_name')
      user.phone_number = ctx.request.input('phone_number')
      user.email = ctx.request.input('email')
      user.password = ctx.request.input('password')
      user.slug = ctx.request.input('slug')
      user.save()
      return 'updated'
    }
    return 'not found'
  }

  public async deleteUser(ctx: HttpContextContract) {
    if ((await this.showOne(ctx)) !== 'not found') {
      await User.query().where('id', ctx.params.id).delete()
      return 'deleted'
    }
    return 'not found'
  }
}
