import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        full_name: 'Administrador',
        phone_number: '(73) 9 1111-1111',
        email: 'administrador@email.com',
        password: '12345678',
        slug: 'administrador',
      },
      {
        full_name: 'Leitor',
        phone_number: '(73) 9 2222-2222',
        email: 'leitor@email.com',
        password: '12345678',
        slug: 'leitor',
      },
    ])
  }
}
