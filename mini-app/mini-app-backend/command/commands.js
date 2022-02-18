import { Command } from 'commander';
const program = new Command();

import { getUser, getUsers, getUsersType } from '../controllers/user.js'

program
    .name('users-util')
    .description('CLI to Mini App Refactory')
    .version('1.0.0')

program
    .command('gets')
    .description('Get all users data')
    .action(() => {
        getUsers()
    })

program
    .command('get-type <type>')
    .description('Get all regular or google account users')
    .action((type) => {
        getUsersType(type)
    })

program.parse()