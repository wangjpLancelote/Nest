import { ArgumentMetadata, PipeTransform, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ApiException } from '../../common/exception/api.exception';
import { ApiErrorCode } from '../../enums/api-error-code.enums';
@Injectable()
export class UserIdPipe implements PipeTransform {
    async transform (value: any, metaData: ArgumentMetadata) {
        value = parseInt(value);
        if (isNaN(value) || typeof value != 'number' || value <= 0) {
            throw new ApiException('用户ID无效', ApiErrorCode.USER_ID_INVALID, HttpStatus.BAD_REQUEST);
            // throw new HttpException('用户编号错误', HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}