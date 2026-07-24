import mongoose,{Schema,model,models} from "mongoose";


const GroupSchema = new Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },


    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]

},
{
    timestamps:true
});


const Group = models.Group || model("Group",GroupSchema);


export default Group;