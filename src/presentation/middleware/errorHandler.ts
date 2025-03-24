// src/presentation/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  code?: number;
  keyValue?: Record<string, unknown>;
  errors?: Record<string, { message: string }>;
  path?: string;
  value?: unknown;
}

export const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('🔥 Error catched by errorHandlerMiddleware:', err);

  let statusCode = 500;
  let message = 'Internal Server Error';

  // 1) MongoDB Duplicate Key (code=11000)
  if (err.code === 11000 && err.keyValue) {
    statusCode = 409;
    const duplicatedFields = Object.keys(err.keyValue).join(', ');
    message = `Duplicate value in field(s): ${duplicatedFields}.`;
  }
  // 2) Mongoose Validation Error
  else if (err.name === 'ValidationError' && err.errors) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');
  }
  // 3) JSON Parse Error (invalid JSON payload)
  else if (err instanceof SyntaxError && 'body' in err) {
    statusCode = 400;
    message = 'Invalid JSON format.';
  }
  // 4) Unauthorized (JWT) error
  else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Invalid or missing authentication token.';
  }
  // 5) Forbidden
  else if (err.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'You do not have permission to access this resource.';
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
