const mongoose = require("mongoose")
const {Schema} = mongoose;


const litableSchema = new Schema({
    city: String,
    street: String,
    rent: Number,
    createAt:{type: Date, default: Date.now()},
    imageUrl: Array
})  

module.exports = mongoose.model("Litable", litableSchema);  