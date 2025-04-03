import mongoose,{Schema,Document} from "mongoose";

//email password avatar url username status(active/inactive/busy/free) type(could be admin or normal user)
interface Iuser extends Document{
    avatar_url:String,
    email:String,
    password:String,
    username:String,
    status:"active"|"inactive"|"busy"|"free",
    user_type:"admin"|"user"
}


const UserSchema=new Schema<Iuser>({
    avatar_url:{type:String, required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    username:{type:String,required:true},
    status:{type:String, 
        enum:["active","inactive","busy","free"],
        required:true},
    user_type:{type:String,
        enum:["admin","user"],
        required:true},
},{timestamps:true});


export default mongoose.model<Iuser>("User",UserSchema)