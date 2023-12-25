const { Schema, default: mongoose } = require("mongoose");

const expenseSchema = new Schema({
    userId : Number,
    expName : String,
    expDate : Date,
    expAmount : Number,
    expMemo : String
});

module.exports = mongoose.model("Expense", expenseSchema);