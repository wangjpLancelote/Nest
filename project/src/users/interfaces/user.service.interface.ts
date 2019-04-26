import { User } from './user.interface';

/**这里是实现userservice的接口类 
 * 这里目前只是接口(定义了方法名)，具体实现是在service层中
*/
export interface IUserService {
    findAll() : Promise<User []>;
    findById(id : number): Promise<User>;
    addUser(User) : Promise<User>;
    editUser(User) : Promise<User>;
    deleteUser(id: number) : Promise<Boolean>;
}