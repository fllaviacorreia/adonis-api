import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Task from 'App/Models/Task'

export default class TasksController {
  public static index: any
  public async index() {
    try {
      const tasks = await Task.query().preload('user').preload('forum')
      return tasks
    } catch (error) {
      return error.message
    }
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
        task.status = 'analyzing'
        task.forumId = ctx.request.input('forum_id')
        await user.related('tasks').save(task)
        return 'created'
      }
    } catch (error) {
      return error.message
    }
  }

  public async update(ctx: HttpContextContract) {
    try {
      const user = await ctx.auth.authenticate()
      const task = await Task.find(ctx.params.id)
      if (task) {
        if (user.slug === 'administrador') {
          task.title = ctx.request.input('title')
          task.description = ctx.request.input('description')
          task.status = ctx.request.input('status')
          task.forumId = ctx.request.input('forum_id')
          task.save()
          return 'updated'
        } else {
          if (user.id === task?.userId) {
            task.title = ctx.request.input('title')
            task.description = ctx.request.input('description')
            task.forumId = ctx.request.input('forum_id')
            if (await task.save()) {
              await task.load('user')
              await task.load('forum')
              return 'updated'
            }
          } else {
            return 'acess denied'
          }
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
        const task = await Task.query()
          .where('user_id', user.id)
          .where('id', ctx.params.id)
          .delete()
        // return task
        return 'deleted'
      } else {
        return 'acess denied'
      }
    } catch (error) {
      return error.message
    }
  }
}
