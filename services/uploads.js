require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


exports.uploadDocument = async(req, res, next) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
        if (!req.file || !req.file.path) {
            console.log("file=====", req.file)
            return res.status(200).json({
                message: "Please select file for upload...!",
                hasError: true
            })
        } else {
            const path = req.file.path;
            const result = await cloudinary.uploader.upload(path);
            console.log('====== File uploaded successfully =======', result);
            res.cloudinaryResult = result;
            next();
        }
    } catch (error) {
        console.log("===== document upload error =====", error);
        fs.rmdirSync('files', { recursive: true });
        return res.status(200).json({
            message: "Some error occurred please try later...!",
            hasError: true
        })
    }
}