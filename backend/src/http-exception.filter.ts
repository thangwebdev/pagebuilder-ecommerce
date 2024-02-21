import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.getResponse() || 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message:
        typeof message === 'string'
          ? message
          : (message as { message: string }).message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
