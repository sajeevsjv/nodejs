const videos = require('../db/models/videos');
const { success_function, error_function } = require('../utils/response_Handler');
const fileUpload = require("../utils/file-upload").fileUpload;

exports.addVideo = async (req,res) =>{
    try{
        let body = req.body;
        let title = body.title;
        let video = body.video;

        let video_path = await fileUpload(video,"videos");
        console.log("video_path :",video_path);
        body.video = video_path;
        
        if(!title){
            let response = error_function({
                statusCode : 400,
                message : "video title is required"
            })
            res.status(response.statusCode).send(response.message);
            return;
        }
        
        let addVideo = await videos.create(body);
        if(addVideo){
            let response = success_function({
                statusCode : 200,
                message : "video added succesfully"
            });
            res.status(response.statusCode).send(response.message)
            return;
        }
        else{
            let response = error_function({
                statusCode : 400,
                message : "failed to add video"
            })
            res.status(response.statusCode).send(response.message);
            return;
        }

    }
    catch(error){
        console.log(error);
        let response = error_function({
            statusCode : 400,
            message : error.message ? error.message : error
        })
        res.status(response.statusCode).send(response.message);
        return;
        
    }
  
}

exports.getAllVideos = async(req,res) =>{
    try{
        let videoss = await videos.find();
        console.log("videoss :",videoss);
        if(videoss){
           let response = success_function({
            statusCode : 200,
            data : videoss,
            message : "videos fetched succesfully"
           })
        res.status(response.statusCode).send(response);
        return;
        }
        else{
            let response = error_function({
                statusCode : 400,
                message : "failed to fetch videos"
               })
            res.status(response.statusCode).send(response);
            return;
    
        }
    }
    catch(error){
        console.log('error :',error);
        let response = error_function({
            statusCode : 400,
            message : error.message ? error.message : error
           })
        res.status(response.statusCode).send(response);
        return;
    }
    
    
}