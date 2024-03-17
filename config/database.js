const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log("DB connected Sucesfully"))
    .catch( (error)=>{
        console.log("Error in DB connection");
        console.error(error);
        process.exit(1);
    })
}