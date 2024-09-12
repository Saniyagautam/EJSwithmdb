const mongoose=require("mongoose");
//creating schema for chat

const chatSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:50
    },
    created_at:{
        type:Date,
        required:true
    }
});

//creting model 
const Chat=mongoose.model("Chat",chatSchema);

//export 
module.exports=Chat;