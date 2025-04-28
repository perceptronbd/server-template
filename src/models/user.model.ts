import { Document, Schema, model } from "mongoose";

/**
 * Interface representing a User document in MongoDB
 */
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema for User model with strict TypeScript types
 */
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Create and export the User model
const UserModel = model<IUser>("User", userSchema);
export default UserModel;
