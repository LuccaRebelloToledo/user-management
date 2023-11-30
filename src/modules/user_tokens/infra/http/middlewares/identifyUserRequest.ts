import { Request, Response, NextFunction } from "express";

import { decode } from "jsonwebtoken";

import AppError from "../../../../../shared/infra/errors/AppError";
import { AppErrorType } from "../../../../../shared/infra/errors/AppErrorType";

interface ITokenPayload {
  exp: number;
  iat: number;
  sub: string;
}

export default function identifyUserRequest(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError(AppErrorType.sessions.tokenNotFound, 401);
  }

  const authHeaderParts = authHeader.split(" ");
  if (
    authHeaderParts.length !== 2 ||
    authHeaderParts[0].toLowerCase() !== "bearer"
  ) {
    throw new AppError(AppErrorType.sessions.invalidTokenFormat, 401);
  }

  const token = authHeaderParts[1];

  try {
    const decoded = decode(token);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err: any) {
    throw new AppError(err.message, 401);
  }
}
