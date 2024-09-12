const mongoose=require("mongoose");
const Chat=require("./models/chats.js");

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

//creating chat 
let allchats=[
    {
        "from": "alex",
        "to": "jordan",
        "msg": "Can you review the project proposal?",
        "created_at": new Date()
    },
    {
        "from": "maya",
        "to": "ryan",
        "msg": "Don't forget to submit the report by 5 PM.",
        "created_at": new Date()
    },
    {
        "from": "nina",
        "to": "sam",
        "msg": "Could you help me with the budget calculations?",
        "created_at": new Date()
    },
    {
        "from": "tariq",
        "to": "lee",
        "msg": "Have you finished the design draft yet?",
        "created_at": new Date()
    },
    {
        "from": "lila",
        "to": "mike",
        "msg": "Please confirm the meeting time for tomorrow.",
        "created_at": new Date()
    },
    {
        "from": "kiran",
        "to": "zara",
        "msg": "Did you get a chance to check the email I sent?",
        "created_at": new Date()
    },
    {
        "from": "oscar",
        "to": "emily",
        "msg": "Can you update the presentation slides?",
        "created_at": new Date()
    }
]


Chat.insertMany(allchats);

