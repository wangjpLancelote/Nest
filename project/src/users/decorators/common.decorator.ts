/**
 * 装饰器 decorator
 * 使用 @decorator 调用
 * 本质就是一个方法
 */
import { ReflectMetadata, createParamDecorator } from "@nestjs/common";

/**
 * Roles装饰器，接受一个数组作为参数，作为需要被认证的角色列表，并附加到元数据上，可通过反射元数据获取到该角色列表。
 * @param roles 
 */
export const Roles = (...roles: string[]) => {return ReflectMetadata('roles', roles)};

export const Authing = createParamDecorator((data, req) => {
    return req.authing;
});

export const AuthUser = createParamDecorator((data, req) => {
    let token = req.query.token || null;
    !token && (token = req.body.token);
    return req.authing.decodeToken(token);
});