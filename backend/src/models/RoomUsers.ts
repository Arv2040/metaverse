import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRoomUser extends Document {
  roomId: Types.ObjectId;
  userId: Types.ObjectId;
  type: "admin" | "user";
  status: "active" | "busy";
}

const RoomUserSchema: Schema = new Schema<IRoomUser>(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "busy"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRoomUser>("RoomUser", RoomUserSchema);
