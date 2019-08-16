const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

class UserController{

    /**
     * signs in a registered user to participate in gist uploading.
     * @param req takes the request from the client
     * @param res server returns the response back to the client
     */
    signIn(req, res){
        if(!validator.isEmail(req.body.email)){
            return res.status(401).json({
                error: true,
                message: 'your email is not correct'
            });
        }
        User.findOne({email: req.body.email})
        .exec().then( user =>{
            if(!user){
                return res.status(401).json({
                    error: true,
                    message: 'email does not exist kindly sign up'
                });
            }
            else {
                bcrypt.compare(req.body.password, user.password, (err, result)=>{
                    if(err){
                        return res.status(401).json({
                            error: true,
                            message: 'auth failed'
                        });
                    }
                    if(result){
                        const token =jwt.sign({
                            email: user.email,
                            userID: user._id
                          },
                          process.env.JWT_SECRET,
                           {
                             expiresIn: "2h"
                              }
                        );
                        
                        return res.status(200).json({
                            error: false,
                            message: 'You logged in succesfully',
                            token: token
                        });
                    }
                    else{
                        return res.status(401).json({
                            error: true,
                            message: 'Incorrect password'
                        });
                    }
                });
            }
        })
        .catch( err=>{
            res.status(400).json({
                error: true,
                message: `error occured: ${err}`
            });
        });
    }
    /**
     * signs up new user to participate in gist uploading.
     * @param req takes the request from the client
     * @param res server returns the response back to the client
     */
    signUp(req, res){
        if(!validator.isEmail(req.body.email)){
            return res.status(401).json({
                error: true,
                message: 'your email is not correct'
            });
        }
        User.findOne({email: req.body.email})
        .exec().then( data =>{
            if(data){
                res.status(409).json({
                statusCode: 409,
                message: 'email passed does exists'
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hpass)=>{
                    if(err){
                        res.status(500).json({
                            error: err.message
                        });
                    }
                    else {
                        let user = new User({
                            fullname: req.body.fullname,
                            email: req.body.email,
                            password: hpass
                            });
                        user.save()
                        .then( user=>{
                            res.status(200).json({
                                error:false,
                                message: `User created succesfully with id ${user._id}`
                            });
                        })
                        .catch( err=>{
                            res.status(400).json({
                                error:true,
                                message: `error occured: ${err}`
                            });
                        });
                    }
                });
            }
        })
        .catch( err=>{
            Response(res)
            .error_res(err, 500);
        });
    }
    /**
     * remove an active user
     * @param req takes the request from the client
     * @param res server returns the response back to the client
     */
    removeUser(req, res){
        
    }
    /**
     * gets all registered users
     * @param req takes the request from the client
     * @param res server returns the response back to the client
     */
    allUser(req, res){
        User.find()
        .then( users =>{
            let data = users.map( user =>{
                let lastname = user.fullname.split(' ')[0];
                let firstname = user.fullname.split(' ')[1];
                return {
                    userId: user._id,
                    lastname: lastname,
                    firstname: firstname,
                    initials: `${lastname[0].toString().toUpperCase()}
                    .${firstname[0].toString().toUpperCase()}`,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            });
            res.status(200).json({
                error: false,
                message: `users fetched successfully`,
                respone: data
            });
        })
        .catch( error =>{
            res.status(400).json({
                error: true,
                message: `error occured: ${error}`
            });
        });
    }
}

module.exports = new UserController();
