import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRoom extends Document{
    roomId: Types.ObjectId;
}

const RoomSchema: Schema=new Schema<IRoom>(
    {
        roomId:{
            type:Schema.Types.ObjectId,
            required:true,
        }
    }
)

export default mongoose.model<IRoom>("Room",RoomSchema);