import mongoose, { Schema, Document } from "mongoose";


export interface IUser extends Document {
  avatar_url: string;
  email: string;
  password: string;
  username: string;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    avatar_url: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    username: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
