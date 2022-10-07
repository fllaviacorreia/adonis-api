import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async showAll(ctx: HttpContextContract) {
    return [
      {
        id: 1,
        full_name: 'Ana Julia Santos',
        telefone: '(73) 9 1111-1111',
        email: 'ana@julia.com',
        senha: '12345678',
        tipo: 'leitor',
      },
      {
        id: 2,
        full_name: 'Ana Maria Santos',
        telefone: '(73) 9 2222-2222',
        email: 'ana@maria.com',
        senha: '12345678',
        tipo: 'leitor',
      },
    ]
  }

  public async showOne(ctx: HttpContextContract) {
    return [
      {
        id: 1,
        full_name: 'Ana Julia Santos',
        telefone: '(73) 9 1111-1111',
        email: 'ana@julia.com',
        senha: '12345678',
        tipo: 'leitor',
      },
    ]
  }

  public async createUser(ctx: HttpContextContract){
    return 'created'
  }

  public async editUser(ctx: HttpContextContract){
    return 'updated'
  }

  public async deleteUser(ctx: HttpContextContract){
    return 'deleted'
  }
}
