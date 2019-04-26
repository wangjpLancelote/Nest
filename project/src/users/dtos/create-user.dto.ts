import { User } from '../interfaces/user.interface';
import {IsString, IsNotEmpty, IsInt, Min, Max} from 'class-validator';
import { ApiErrorCode } from '../../enums/api-error-code.enums';
import { Type } from 'class-transformer';

/**
 * DTO:就是对数据处理的简单类
 * 这里用作全局的数据验证器, 暴露到全局
 */
export class CreateUserDto implements User {

    @Type(() => Number) /**手动指定元数据类型  在validate 的pipe参数处理的地方需要用到这些指定的元数据*/
    @IsInt({message: 'id必须是整数', context: {errorCode: ApiErrorCode.USER_ID_INVALID}})
    @Min(1, {message: 'id必须不小于1', context: ApiErrorCode.USER_ID_INVALID})
    readonly id: number;


    @Type(() => String)
    @IsNotEmpty({message: '用户名必填', context: {errorCode: ApiErrorCode.USER_NAME_INVALID}})
    @IsString({message: '用户名必须是string类型', context: {errorCode: ApiErrorCode.USER_NAME_INVALID}})
    readonly name: string;

    @Type(() => Number)
    @IsInt({message: 'id必须是整数', context: {errorCode: ApiErrorCode.USER_AGE_INVALID}})
    @Min(1, {message: '年龄必须不小于1岁',context: {errorCode: ApiErrorCode.USER_AGE_INVALID}})
    @Max(100, {message: '年龄不大于100岁', context: {errorCode: ApiErrorCode.USER_AGE_INVALID}})
    readonly age: number;
}