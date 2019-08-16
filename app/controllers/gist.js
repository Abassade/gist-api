// MULTER
const multer = require('multer');
const gistService = require('../services/gist');
const gistModel = require('../models/gist');
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
            if (err) {
              console.log('eror while uploading', err);
              return res.json({
                error: true,
                message: 'eror while uploading',
                response: err
            })
            }
            console.log('file uploaded to server');
            const path = req.file.path;
            gistService.uploadToCloud(path)
            .then( image =>{
                let gist = new gistModel({
                    title: req.body.title,
                    description: req.body.description,
                    gistImageUrl: image.url !== null ? image.url : ''
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
          });
          
    }

    getGist(req, res){
        if(!id){
            return res.send({
                error: true,
                message: 'oga pass the id joor',
            });
        }
        const id = req.params.id;
        gistModel.findById(id)
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
        .then( gists =>{
            res.send({
                error: false,
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
}
module.exports = new Gist();