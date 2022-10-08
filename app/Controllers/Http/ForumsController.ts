import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Forum from 'App/Models/Forum'

export default class ForumsController {
  public static showAll: any
  public async showAll(ctx: HttpContextContract) {
    try {
      const user = await ctx.auth.authenticate()
      if (user.slug === 'administrador') {
        const forums = await Database.query().from('forums').select('*')
        return forums
      }
      const forums = await Forum.query().preload('user').preload('tasks')
      return forums
    } catch (error) {
      return 'error'
    }
  }

  public async showOne(ctx: HttpContextContract) {
    try {
      const forum = await Forum.find(ctx.params.id)
      if (forum) {
        await forum.load('user')
        await forum.load('tasks')
        return forum
      }
      return 'not found'
    } catch (error) {
      console.log(error)
      return 'error'
    }
  }

  public async createForum(ctx: HttpContextContract) {
    try {
      const user = await ctx.auth.authenticate()
      const forum = new Forum()
      if (forum) {
        forum.title = ctx.request.input('title')
        forum.description = ctx.request.input('description')
        forum.status = ctx.request.input('status')
        await user.related('forums').save(forum)
        return 'created'
      }
      return 'not created'
    } catch (error) {
      return 'error'
    }
  }

  public async editForum(ctx: HttpContextContract) {
    try {
      const forum = await Forum.find(ctx.params.id)
      if (forum) {
        forum.title = ctx.request.input('title')
        forum.description = ctx.request.input('description')
        if (await forum.save()) {
          await forum.load('user')
          await forum.load('tasks')
          return 'updated'
        }
        return 'not found'
      }
    } catch (error) {
      return 'error'
    }
  }

  public async deleteForum(ctx: HttpContextContract) {
    try {
      const user = await ctx.auth.authenticate()
      const forum = await Forum.query()
        .where('user_id', user.id)
        .where('id', ctx.params.id)
        .delete()
      return forum
    } catch (error) {
      return 'error'
    }
  }
}
