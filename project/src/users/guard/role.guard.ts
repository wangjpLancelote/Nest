import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

/**
 * 看守器 使用@injectable 修饰的，并且实现了canActivate接口的类
 * 一般是用来做接口的权限控制
 * @example 查看接口请求中是否含有token，或者token是否过期
 */

 @Injectable()
 export class RolesGuard implements CanActivate {
    constructor (private readonly reflector : Reflector) {
    }

    canActivate (context: ExecutionContext) : boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        /**通过反射获取 在装饰器中定义的roles数组 */
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        /**查看roles中是否 有待验证的user元素
         * 且必须带有token字段，否则验证失败
         * 兼容GET || POST
        */
        if (roles && roles.some(item => item === 'user')) {
            return request.query.token || request.body.token;
        }
        return;
    }
 }