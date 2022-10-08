import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Task from 'App/Models/Task'

export default class TasksController {
  public static index: any
  public async index(ctx: HttpContextContract) {
    const user = await ctx.auth.authenticate()
    if (user.slug === 'administrador') {
      const tasks = await Database.query().from('tasks').select('*')
      return tasks
    }
    await user.load('tasks')
    const tasks = user.tasks
    return tasks
  }

  public async show(ctx: HttpContextContract) {
    try {
      const task = await Task.find(ctx.params.id)
      if (task) {
        await task.load('user')
        await task.load('forum')
        return task
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
      const task = new Task()
      if (task) {
        task.title = ctx.request.input('title')
        task.description = ctx.request.input('description')
        task.status = ctx.request.input('status')
        task.forum_id = ctx.request.input('forum_id')
        await user.related('tasks').save(task)
        return 'created'
      }
    } catch (error) {
      return 'error'
    }
  }

  public async update(ctx: HttpContextContract) {
    try {
      const task = await Task.find(ctx.params.id)
      if (task) {
        task.title = ctx.request.input('title')
        task.description = ctx.request.input('description')
        task.status = ctx.request.input('status')
        task.forum_id = ctx.request.input('forum_id')
        task.save()
        return 'updated'
      }
      return 'not found'
    } catch (error) {
      return 'error'
    }
  }

  public async destroy(ctx: HttpContextContract) {
    try {
      const user = await ctx.auth.authenticate()
      const task = await Task.query().where('user_id', user.id).where('id', ctx.params.id).delete()
      return task
    } catch (error) {
      return 'error'
    }
  }
}
