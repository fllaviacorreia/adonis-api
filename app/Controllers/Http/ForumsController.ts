import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Forum from 'App/Models/Forum'

export default class ForumsController {
  public async index() {
    try {
      const forums = await Forum.query().preload('user').preload('tasks')
      return forums
    } catch (error) {
      return error.message
    }
  }

  public async show(ctx: HttpContextContract) {
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

  public async store(ctx: HttpContextContract) {
    try {
      const user = await ctx.auth.authenticate()
      if (user) {
        const forum = new Forum()
        forum.title = ctx.request.input('title')
        forum.description = ctx.request.input('description')
        forum.status = 'analyzing'
        await user.related('forums').save(forum)

        if (forum) {
          return 'created'
        }
        return 'not created'
      }
      return 'acess denied'
    } catch (error) {
      return error.message
    }
  }

  public async update(ctx: HttpContextContract) {
    try {
      const user = await ctx.auth.authenticate()
      const forum = await Forum.find(ctx.params.id)
      if (user.slug === 'administrador') {
        if (forum) {
          forum.title = ctx.request.input('title')
          forum.description = ctx.request.input('description')
          forum.status = ctx.request.input('status')

          if (await forum.save()) {
            await forum.load('user')
            await forum.load('tasks')
            return 'updated'
          }
          return 'not found'
        }
      } else {
        if (forum) {
          if (user.id === forum?.userId) {
            forum.title = ctx.request.input('title')
            forum.description = ctx.request.input('description')

            if (await forum.save()) {
              await forum.load('user')
              await forum.load('tasks')
              return 'updated'
            }
            return 'not found'
          }
        } else {
          return 'acess denied'
        }
      }
      return 'not found'
    } catch (error) {
      return 'error'
    }
  }

  public async destroy(ctx: HttpContextContract) {
    try {
      const user = await ctx.auth.authenticate()
      if (user.slug === 'administrador') {
        const forum = await Forum.query()
          .where('user_id', user.id)
          .where('id', ctx.params.id)
          .delete()
        // return forum
        return 'deleted'
      } else {
        return 'acess denied'
      }
    } catch (error) {
      return error.message
    }
  }
}
