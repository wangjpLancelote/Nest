import { Injectable } from '@nestjs/common';
import { User } from '../../interfaces/user.interface';
import { IUserService } from '../../interfaces/user.service.interface';

/**
 * service的提供者，真正的方法实现就在这里，所以这里要实现service层的接口：IUserService
 * 因为实现接口，要实现接口内除静态方法的所有的方法，否则会报错
 * 所谓的提供者就是一个使用@Injectable()修饰的类Class
 * 除了service可以作为提供者提供服务外，还有repository, factory, helper等也能作为提供者提供相应的服务，他们之间也可以互相依赖
 * 因此在以后若想要修改对外接口服务，只需要修改service类中的具体实现就可以了，程序的耦合度降低
 */
@Injectable()
export class UsersService implements IUserService {

    private static users: User [] = [
        {
            id: 1, name: 'lucifer', age: 17
        },
        {
            id: 2, name: 'luanch', age: 18,
        },
        {
            id: 3, name: 'looper', age: 19
        }
    ];
    async findAll() : Promise<User []> {
        return UsersService.users;
    }
    async findById (id: number) : Promise<User> {
        return UsersService.users.find(user => user.id === id);
    }
    async addUser (user: User) : Promise<User> {
        UsersService.users.push(user);
        return user;
    }
    async editUser () : Promise<User> {
        return;
    }
    async deleteUser () : Promise<Boolean> {
        return true;
    }
}
