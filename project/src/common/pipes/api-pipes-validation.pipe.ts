/**
 * 这里是全局的pipe文件，用来验证各种参数的合法性，因为是作用于全局，所以写在common里,具有显示的意义
 */
import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus} from '@nestjs/common';
import { ApiException } from '../exception/api.exception';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ApiParamsValidationsPipe implements PipeTransform {
    async transform (value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        /**不是类而是普通的js对象，则不进行监测 */
        if (!metatype || !this.toValidate(metatype)) return value;

        /**通过元数据类型和对象实例，构建对象类型 */
        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length) {
            let err = errors.shift(); /**获取第一个错误类型 */
            let constraints = err.constraints;
            let contexts = err.contexts;

            /**以上就是未通过验证的字段的错误信息和状态码  抛给ApiException 转到全局过滤器*/
            for (const key in constraints) {
                throw new ApiException(constraints[key], contexts[key].errorCode, HttpStatus.BAD_REQUEST)
            }
        }
        return value;
    }

    private toValidate (metaType) : Boolean {
        const types = [String, Boolean, Number, Array, Object]
        return !types.find(type => metaType == type);
    }
} 