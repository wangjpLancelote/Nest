import { Controller, Get, Param, Post, Put, Delete, Body, Inject, Res, HttpStatus, HttpException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { IUserService } from './interfaces/user.service.interface';
import { ApiException } from '../common/exception/api.exception';
import { ApiErrorCode } from '../enums/api-error-code.enums';
import { UserIdPipe } from '../users/pipes/user-id.pipe';
import { CreateUserDto } from './dtos/create-user.dto'
import { async } from 'rxjs/internal/scheduler/async';
import { Roles, Authing, AuthUser } from './decorators/common.decorator';

/**REST 控制器 [rest Api] [User] */
/**
 * 控制器应只专注于对请求的分发，而不关注的请求的具体实现，所以这里就使用依赖注入的方式，将方法的具体实现从service层导入
 * 这里实际上就是express/koa的路由 | 
 * 
 * Get 参数：@Param() params ==>>req.params
 * Post 参数：@Body() body ==>>req.body
 * Put参数：@Query() query ==>>req.query
 * Headers 参数：@Headers() ==>>req.headers
 * @Request () ==>>req
 * @Response() ==>>res
 * @Session() ==>>req.session
 * @Next() ==>>next
 */
@Controller('users') /**users这里定义的表示控制器的前缀，若想要访问改控制器，就必须加上该前缀,这么处理的原因是去中心化路由 */
export class UsersController {
    constructor (@Inject('UsersService') private userService : IUserService) {

    }
    @Get() /**装饰器@ 一些预定义的方法 目的就是试图解释被修饰的方法，或影响被修饰的方法*/
    async findAll () : Promise<User []> {
        return await this.userService.findAll();
    }
    @Get(':id') /**带参数的路由 */
    async findById (@Param('id', new UserIdPipe()) id) : Promise<User> {
        /**引入鉴权系统 自定义错误码，错误信息 缺点是代码臃肿，且每段验证的地方都要写这种代码*/
        //管道pipe():目的就是将数据处理
        // if (isNaN(id) || typeof id == 'string' || id < 0) {
        //     return res.status(HttpStatus.BAD_REQUEST).send({
        //         errCode: 1001,
        //         errMessage: '用户编号错误'
        //     })
        // }
        // return res.status(HttpStatus.OK).send({
        //     successCode: 0,
        //     successMessage: '请求成功',
        //     data: await this.userService.findById(params.id)
        // })

        /**数据类型处理 */
        // if (isNaN(id) || typeof id == 'string' || id < 0) {

        //     throw new ApiException('用户ID无效', ApiErrorCode.USER_ID_INVALID, HttpStatus.BAD_REQUEST); /**继承自HttpException 自定义错误处理 */

        //     // throw new HttpException('用户编号错误', HttpStatus.BAD_REQUEST); 这里是系统默认的错误处理
        // }
        return await this.userService.findById(id);
        
    }

    @Post()
    async addUser (@Body() user : CreateUserDto) : Promise<User>{
        //TODO:新增用户
        return await this.userService.addUser(user);
    }
    @Post('login')
    async login (@Authing() authing) {
        try {
            const result = await authing.login({
                email: '',
                password: ''
            });
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    @Get('info')
    @Roles('user') //修饰器修饰了user
    async info(@AuthUser() user, @Authing() authing) {
        try {
            return await authing.user({
                id: user.data.id
            })
        } catch (e) {
            console.log(e);
        }
    }
    @Put()
    async editUser (@Body() user : CreateUserDto) :Promise<User> {
        /**TODO 修改用户 */
        return await this.userService.editUser(user);
    }
    @Delete(':id')
    async deleteUser (@Param('id', new UserIdPipe()) id) :Promise<Boolean> {
        /**TODO 删除用户 */
        return await this.userService.deleteUser(id);
    }
}
