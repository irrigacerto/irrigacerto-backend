import { Response as ExpressResponse } from 'express';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ExceptionResponse } from '@/interfaces/exception-response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res = ctx.getResponse<ExpressResponse>();
    const exceptionResponse: null | ExceptionResponse = exception.getResponse
      ? (exception.getResponse() as ExceptionResponse)
      : null;
    const status: number = exception.getStatus ? exception.getStatus() : 500;

    const errorBody = {
      error: exception.name,
      message: exception.message,
    };

    if (exceptionResponse) {
      if (Array.isArray(exceptionResponse.message)) {
        Reflect.set(errorBody, 'messages', exceptionResponse.message);
      } else {
        Reflect.set(errorBody, 'message', exceptionResponse.message);
      }
    }

    return res.status(status).json(errorBody);
  }
}
