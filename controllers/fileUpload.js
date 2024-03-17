// const { emitWarning } = require("process");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2

//localFileUpload
exports.localFileUpload = async (req,res)=>{
    try{
        const file = req.files.file
        console.log("File aagyi ->",file);

        let path = __dirname  + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path-> ", path)
        file.mv(path, (err)=>{
            console.log(err);
        })
        res.json({
            success:true,
            message:"Local file uploaded Sucesfully"
        })
    }
    catch(error){
        console.log(error);
        res.json({
            succcess:false,
            message:"Error in localFileUpload"
        })
    }
}

function isFIleTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    console.log("temp file path", file.tempFilePath)
    options.resource_type = "auto";
    if(quality){
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(req,res) => {
    try{
        //data fetch
        const{name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFIleTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }

        // file format is supported
        const response = await uploadFileToCloudinary(file, "ch")

        console.log(response);


        const fileData = await File.create({
            name, 
            imageUrl: response.secure_url,
            email,
            tags, 
           
            
        });

        console.log(fileData);
        console.log(response.secure_url);
        res.json({
            success:true,
            message:"Image sucessfully uploaded"
        })

    }
    catch(err){
        console.log(err);
        res.status(400).json({
            succcess:false,
            message:"Error in imageUpload"
        })
    }
    
}


// video upload
exports.videoUpload = async (req,res)=>{
    try{
        const{name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;   
        console.log(file);

        //validation
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        
        if(!isFIleTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }

        // checking size og a video
        if(file.size >  5*1024*1024){
            return res.json({
                success:false,
                message:"Video size is greater than 5MB please compress it"
            })
        }

        const response = await uploadFileToCloudinary(file, "ch")

        console.log(response);


        const fileData = await File.create({
            name, 
            imageUrl: response.secure_url,
            email,
            tags, 
           
            
        });

        console.log(fileData);
        console.log(response.secure_url);
        res.json({
            success:true,
            message:"Video sucessfully uploaded"
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Error occured in videoUpload"
        })
    }


}


exports.imageSizeReducer = async(req,res)=>{
    try{
        //data fetch
        const{name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFIleTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }
        

        // file format is supported
        const response = await uploadFileToCloudinary(file, "ch", 50)

        console.log(response);


        const fileData = await File.create({
            name, 
            imageUrl: response.secure_url,
            email,
            tags, 
           
            
        });

        console.log(fileData);
        console.log(response.secure_url);
        res.json({
            success:true,
            message:"Image sucessfully uploaded"
        })

    }
    catch(err){
        console.log(err);
        res.status(400).json({
            succcess:false,
            message:"Error in imageUpload"
        })
    }   
}