const multer = require('multer');
const gistService = require('../services/gist');
const gistModel = require('../models/gist');
const fs = require('fs');
const storage =   multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, './uploads');
	},
	filename: (req, file, callback) => {
		callback(null, file.originalname);
	}
});
const upload = multer({ storage }).single("file");

class Gist {
    createGist(req, res){
        upload(req, res, (err) => {
            if(!req.file){
                return res.json({
                    error: true,
                    message: 'ensure you upload file from formdata'
                }); 
            }
            const {path} = req.file;
            let  {title, description, user, likes} = req.body;
            user = req.token;
            if(!title || !description){
                // delete the file uploaded to the server
                fs.unlinkSync(path);
                return res.json({
                    error: true,
                    message: 'oga pass the required fields'
                }); 
            }
            if (err) {
              console.log('eror while uploading', err);
              return res.json({
                error: true,
                message: 'eror while uploading',
                response: err
            });
            }
            console.log('file uploaded to server');
            gistService.uploadToCloud(path)
            .then( image =>{
                let gist = new gistModel({
                    user, title, description, likes,
                    gistImageUrl: image.url !== null ? image.url :
                     'default_image_path'
                });
                gist.save()
                .then( data =>{
                    console.info('gist has been persisted to mongodb');
                    res.json({
                        error: false,
                        message: 'gist created',
                        response: data
                    });
                }).catch( error =>{
                    res.json({
                        error: true,
                        message: 'error saving tomongodb',
                        response: error
                    });
                });
            }).catch( error =>{
                res.json(error);
            })
          });   // end upload
          
    }

    getGist(req, res){
        if(!id){
            return res.send({
                error: true,
                message: 'oga pass the id joor',
            });
        }
        const {id} = req.params;
        gistModel.findById(id)
        .populate('user', 'fullname')
        .select({"__v":0, })
        .exec()
        .then( gist =>{
            res.send({
                error: false,
                message: 'successfully fetched gist',
                response: gist
            });
        })
        .catch( error =>{
            res.send({
                error: true,
                message: 'error while querying gist mongodb',
                response: error
            });
        });
    }

    getAllGist(req, res){
        gistModel.find()
        .populate('user', 'fullname')
        .select({"__v":0, })
        .exec()
        .then( gists =>{
            res.send({
                error: false,
                totalCount: gists.length,
                message: 'successfully fetched all gists',
                response: gists
            });
        })
        .catch( error =>{
            res.send({
                error: true,
                message: 'error while querying gists mongodb',
                response: error
            });
        });
    }

    // TODO: make a route to get by by username
    getGistsByUserId(req, res){
        let {user} = req.query;
        gistModel.find({user})
        .then( gists =>{
            res.send({
                error: false,
                totalCount: gists.length,
                message: 'successfully fetched all gists',
                response: gists
            });
        })
        .catch( error =>{
            if(error.name === 'CastError'){
                return res.send({
                    error: false,
                    message: `no gists found for user ${user}`
                });
            }
            res.send({
                error: true,
                message: 'error while querying gists mongodb',
                response: error
            });
        });
    }
}
module.exports = new Gist();