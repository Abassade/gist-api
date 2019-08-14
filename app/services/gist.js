const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const uniqueFilename = new Date().toISOString();

// SEND FILE TO CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

class Gist {
    uploadToCloud(filePath){
        return new Promise((resolve, reject)=>{
            cloudinary.uploader.upload(
                filePath,
                { public_id: `gist/${uniqueFilename}`, tags: `gist` },
                (err, image) => {
                  if (err){
                    reject(err);
                  }
                  if(image) {
                    console.log('file uploaded to Cloudinary')
                    // remove file from server
                    fs.unlinkSync(filePath);
                    // return image details
                    resolve(image);
                  }
                }
              )
        });
    }
}
module.exports = new Gist();