const AWS = require("aws-sdk");
require('dotenv').config();

exports.uploadBase64ToAmazon = ( photoInBase64, filename, id = null ) => {
    return new Promise((resolve, reject) => {
        if ( photoInBase64 && photoInBase64 !== "" ) {
            const S3Link = process.env.AWS_S3_LINK;
            const fileName = filename;
            const fileExtension = photoInBase64.split(';')[0].split('/')[1];
            const uniqueFileName = generateFileCode(fileName) + "." + fileExtension;
            const buffer = Buffer.from(photoInBase64.replace(/^data:image\/\w+;base64,/, ""),'base64');

            if ( imageFilter(fileExtension) ) {
                const S3Bucket = AWSverify();
        
                const params = {
                  Bucket: process.env.AWS_BUCKET_NAME,
                  Key: uniqueFileName,
                  Body: buffer,
                  ContentType: `image/${fileExtension}`,
                  ContentEncoding: 'base64',
                  ACL: "public-read"
                }
            
                S3Bucket.upload(params, (error) => {
                    if ( error ) reject(error);
                    else resolve({ link: S3Link + uniqueFileName, id });
                })
            } else {
                reject("Photo should be in one of the following formats: JPG, JPEG, PNG, GIF.");
            }
        } else {
            reject("Base64 string should be provided.");
        }
    })
}

const generateFileCode = (name, length = 30) => {
    let code = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + name;
    
    for ( let i = 0; i < length; i++ ) {
        const index = Math.floor(Math.random() * characters.length);
        code += characters.charAt(index);
    }
  
    return code;
} 

const AWSverify = () => {
    return new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    })
}

const imageFilter = (extension) => {
    return ["jpg", "jpeg", "png", "gif"].includes(extension.toLowerCase());
}

// needs to be written as a method.

exports.deletePhoto = async (req, res, next) => {
    try {
        let S3Bucket = AWSverify();
        const currentUser = await db.User.findById(req.params.userID);
  
        // IF THERE IS ALREADY AN AVATAR, DELETE IT FROM S3
        const defaultAvatar = "https://socialization-app.s3.eu-west-2.amazonaws.com/noprofile.jpg";
        if ( currentUser.avatar !== defaultAvatar ) {
            const currentFileName = currentUser.avatar.split("/").pop();
            S3Bucket.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: currentFileName }, (error) => {
                if ( !error ) return res.status(200).json({ link: currentUser.avatar });
            });
        }
    } catch (error) {
        return next(error);
    }
}