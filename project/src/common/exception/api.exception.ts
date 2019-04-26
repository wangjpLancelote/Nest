import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../../enums/api-error-code.enums';
export class ApiException extends HttpException {
    private errorMessage : string;
    private errorCode : ApiErrorCode;

    constructor(errorMessage: string, errorCode: ApiErrorCode, statusCode: HttpStatus) {
        super(errorMessage, statusCode);
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    getErrorCode () : ApiErrorCode {
        return this.errorCode
    }
    getErrorMessage () : string {
        return this.errorMessage
    }
}