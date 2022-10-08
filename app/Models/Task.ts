import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Forum from './Forum'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public status: string

  @column()
  public user_id: number

  @column()
  public forum_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relacionamentos
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Forum)
  public forum: BelongsTo<typeof Forum>
}
