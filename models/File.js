const mongoose = require("mongoose");
const nodemailer = require("nodemailer")
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post
fileSchema.post("save", async function(doc){
    try{
        console.log("Doc: ", doc)

        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }, 
        });

        let info = await transporter.sendMail({
            from:"by CH",
            to: doc.email,
            subject:"New file uploaded on CLoudinary",
            html:`<h2> Hello , file uploaded </h2><br><br> View here: <a href = "${doc.imageUrl}"> ${doc.imageUrl} </a>`,
        });

        console.log("INFO", info)
    }
    catch(error){
        console.error(error)
    }

})

module.exports = mongoose.model("File", fileSchema);