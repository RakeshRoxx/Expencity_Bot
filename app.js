require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const { error } = require("console");
const Expense = require("./Model/Expense.js");
const User = require("./Model/User.js");

const bot = new TelegramBot(process.env.TOKEN, {polling : true});
mongoose.connect("mongodb://127.0.0.1:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });



const saveExpanse = async(expanseDetails, userId) => {
    const expense = new Expense({
        userId : userId,
        expName : expanseDetails[0],
        expAmount : expanseDetails[1],
        expDate : new Date(),
        expMemo : "New Expanse"
    });
    
    await expense.save();
};

const createUser = async(data) => {
    const user = new User({
        userId : data.userId,
        userName : data.userName,
        createdAt : new Date()
    })
    console.log(data);
    await user.save();
};

const getTotalExpanse = async(userId) => {
    let total = 0;
    console.log("In getTotalExpanse");
    console.log("UserId: ", userId);
    const expenses = await Expense.find({userId : userId});
    for(let exp in expenses){
        console.log(exp);
        total += exp.expAmount;
    }
    // console.log(expenses);
    return total;
};

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const userName = msg.from.username;
    const text = msg.text;
    // console.log(chatId, userId, text);
    // createUser({userId, userName});
    // saveExpanse();
    if(text === "/start"){
        bot.sendMessage(chatId, `Welcome to Expense Tracking Bot`);
        createUser({userId, userName});
    }else if(text === "/total"){
        const total = getTotalExpanse(userId);
        bot.sendMessage(chatId, `Total Expanse = ${total}`);
    }
    else{
        const expanseDetails = text.split(" ");        
        saveExpanse(expanseDetails, userId); 
    }

})