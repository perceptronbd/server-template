import {
  DEFAULT_MONGOOSE_ERROR,
  MONGOOSE_ERROR_MAP,
  TMongooseError,
} from "@/utils/mongoose.util";
import { HTTP_STATUS_CODES } from "../utils/http-status-codes";
import { AppError, ErrorResponse } from "../types/error.type";
import { Error as MongooseError } from "mongoose";
import { ZodError } from "zod";

export const appError = (error: AppError, response: ErrorResponse) => {
  response.code = error.statusCode;
  response.message = error.message;
  response.details = error.details;
};

export const zodError = (error: ZodError, response: ErrorResponse) => {
  response.code = HTTP_STATUS_CODES.BAD_REQUEST;

  const formattedErrors = error.errors.map((err) => {
    console.log(err.path[1]);
    return {
      field: err.path[1],
      message:
        err.path.length === 0
          ? "Request body cannot be empty"
          : err.code === "invalid_type" && err.received === "undefined"
            ? `${err.path[1]} is required`
            : err.message,
      code: err.code,
    };
  });

  // Create a combined message from all validation errors
  const errorMessage = formattedErrors.map((err) => err.message).join(", ");

  response.message = `${errorMessage}!`;
  response.details = {
    errors: formattedErrors,
  };

  if (process.env.NODE_ENV === "development") {
    response.details.debug = error;
  }
};
export const generalError = (error: Error, response: ErrorResponse) => {
  response.message = error.message;
  response.details =
    process.env.NODE_ENV === "development" ? { stack: error.stack } : undefined;
};

export const mongooseError = (
  error: TMongooseError,
  response: ErrorResponse,
) => {
  // Determine the error type and look up in the mapping or use default
  const errorType = error.name as keyof typeof MONGOOSE_ERROR_MAP;
  const { code, message } =
    MONGOOSE_ERROR_MAP[errorType] || DEFAULT_MONGOOSE_ERROR;

  // Set the response properties
  response.code = code;
  response.message = message;

  // Add details in development mode
  if (process.env.NODE_ENV === "development") {
    response.details = {
      name: error.name,
      reason: error.message,
      // Add validation errors if present
      ...(error instanceof MongooseError.ValidationError && {
        validationErrors: Object.keys(error.errors).map((key) => ({
          field: key,
          message: error.errors[key].message,
        })),
      }),
    };
  }
};

export const errorHandler = {
  appError,
  zodError,
  generalError,
  mongooseError,
};
