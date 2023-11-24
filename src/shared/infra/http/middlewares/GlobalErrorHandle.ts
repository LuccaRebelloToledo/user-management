import { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';

import AppError from '../../errors/AppError';
import { isCelebrateError } from 'celebrate';
import EscapeHtml from 'escape-html';
import http from 'http';

export default function globalErrorHandler(
  err: Error,
  request: Request,
  response: Response,
  _next: NextFunction,
): Response {
  const errorData = {
    error: err,
    message: err.message,
    requestUrl: request.url,
    requestMethod: request.method,
    requestHeaders: request.headers,
    requestQuery: request.query,
    requestParams: request.params,
    requestBody: request.body,
    requestBodyStringified: JSON.stringify(request.body),
    statusCode: request.statusCode,
    statusMessage: request.statusMessage,
  };

  // eslint-disable-next-line no-console
  console.error(err);

  if (isCelebrateError(err)) {
    const validation: Record<string, unknown> = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [segment, joiError] of err.details.entries()) {
      validation[segment] = {
        source: segment,
        keys: JSON.stringify(
          joiError.details.map((detail) => EscapeHtml(detail.path.join('.'))),
        ),
        message: joiError.message,
      };
    }

    const validationError = {
      statusCode: 400,
      error: http.STATUS_CODES[400],
      message: err.message,
      validation,
    };

    const segmentErrorObject = Object.entries(validation).pop()?.pop() as
      | {
          message: string;
        }
      | undefined;

    const errorTitle = segmentErrorObject?.message
      ? `${err.message} - ${segmentErrorObject.message}`
      : err.message;

    Sentry.captureException(
      { ...err, name: errorTitle },
      {
        fingerprint: [errorTitle],
        extra: {
          ...errorData,
          validation,
        },
      },
    );

    return response.status(400).json(validationError);
  }

  if (err instanceof AppError) {
    Sentry.captureException(err, {
      fingerprint: [err.message],
      extra: {
        ...errorData,
        responseMessage: err.message,
        responseStatusCode: err.statusCode
      },
    });

    return response.status(err.statusCode).json({
      status: http.STATUS_CODES[err.statusCode],
      message: err.appErrorType
    });
  }

  Sentry.captureException(err, {
    fingerprint: [err.message],
    extra: errorData,
  });

  return response.status(500).json({
    status: http.STATUS_CODES[500],
    message: 'internal-server-error',
  });
}