import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import ForumsController from './ForumsController'
import TasksController from './TasksController'

export default class UsersController {
  public async showAll() {
    try {
      const users = await Database.query().from('users').select('*')
      // const user = await User.all
      return users
    } catch (error) {
      return 'error'
    }
  }

  public async showOne(ctx: HttpContextContract) {
    try {
      const user = await User.find(ctx.params.id) //exclui password
      if (user) {
        return user
      }
      return 'not found'
    } catch (error) {
      return 'error'
    }
  }

  //   ao invés desse argumento, pode ser {request}: HttpContextContract
  public async createUser(ctx: HttpContextContract) {
    try {
      const newUser = new User()
      newUser.full_name = ctx.request.input('full_name')
      newUser.phone_number = ctx.request.input('phone_number')
      newUser.email = ctx.request.input('email')
      newUser.password = ctx.request.input('password')
      newUser.slug = ctx.request.input('slug')
      await newUser.save()
      return newUser
    } catch (error) {
      return 'error'
    }
  }

  public async editUser(ctx: HttpContextContract) {
    try {
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
    } catch (error) {
      return 'error'
    }
  }

  public async deleteUser(ctx: HttpContextContract) {
    try {
      const user = await User.query().where('id', ctx.params.id).delete()
      return user
      //return response.redirect('/users')
    } catch (error) {
      return 'not found'
    }
  }

  public async tasksByUser(ctx: HttpContextContract) {
    return new TasksController.showAll(ctx)
  }

  public async forumsByUser(ctx: HttpContextContract) {
    return new ForumsController.showAll(ctx)
  }
}
