import { HTTP_STATUS_CODES } from "./http-status-codes";
import { Error as MongooseError } from "mongoose";

type TMongooseErrorType =
  | "CastError"
  | "ValidationError"
  | "DocumentNotFoundError"
  | "MongoServerError";

type TMongooseErrorMap = {
  [key in TMongooseErrorType]: {
    code: number;
    message: string;
  };
};

export const MONGOOSE_ERROR_MAP: TMongooseErrorMap = {
  CastError: {
    code: HTTP_STATUS_CODES.BAD_REQUEST,
    message: "Invalid data format",
  },
  ValidationError: {
    code: HTTP_STATUS_CODES.BAD_REQUEST,
    message: "Validation failed",
  },
  DocumentNotFoundError: {
    code: HTTP_STATUS_CODES.NOT_FOUND,
    message: "Document not found",
  },
  MongoServerError: {
    code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    message: "Database operation failed",
  },
};

export const DEFAULT_MONGOOSE_ERROR = {
  code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
  message: "An unexpected database error occurred",
};

export type TMongooseError =
  | MongooseError.CastError
  | MongooseError.ValidationError
  | MongooseError.DocumentNotFoundError;
