const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const Chat=require("./models/chats.js");
const methodOverride=require("method-override");//for put and delete req

app.set("views",path.join(__dirname,"views"));//for ejs templates
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));//static files like css
app.use(express.urlencoded({extended:true}));//to parse to post data
app.use(methodOverride("_method"));

//build mongoose connection 
main().then(()=>{
    console.log("connection sucessful!");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//1)Index Route
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();//store all chats in chats var
    res.render("index.ejs",{chats});
})

//2.1)New chat route(get) part1
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//2.2)create route fro new chat part2
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({//creating a new chat
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newChat.save().then((res)=>{//save the chat in db
        console.log("chat is saved");
    })
    .catch((err)=>{
        console.log("err");
    })
    res.redirect("/chats");
})

//3.1)Edit Route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})
//3.2) Update Route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg});
    res.redirect("/chats");
})

//4)Destroy Route
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");

})

//basic routes
app.get("/",(req,res)=>{
    res.send("working");
})
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})