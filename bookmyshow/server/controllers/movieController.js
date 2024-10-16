const movies = require("../db/models/movies");
const { success_function, error_function } = require("../utils/response-handler");
const mongoose = require('mongoose');
const genres = require('../db/models/genres');

const fileUpload = require("../file-upload").fileUpload;

exports.addmovie = async (req, res) => {

    try {
        let data = req.body;
        console.log("data from request :", data);

        let thumbnail = req.body.thumbnail;
        let background_image = req.body.background_image;

        if (background_image) {
            let img_path = await fileUpload(background_image, "bg_images");
            console.log("img_path :", img_path);
            data.background_image = img_path;
        }

        if (thumbnail) {
            let img_path = await fileUpload(thumbnail, "thumbnails");
            console.log("img_path :", img_path);
            data.thumbnail = img_path;
        }

        let genrefrominput = data.genre;
        console.log("genre from input:",genrefrominput);

       

        let matching_id = await genres.find({genre : { $in : genrefrominput}},{_id : 1});
        console.log("matching_id:",matching_id);

        let genreIds = matching_id.map(genre => genre._id.toString());
        console.log("genreids :",genreIds);
        data.genres = genreIds;

        delete data.genre;

        addmovie = await movies.create(data);

        if (addmovie) {
            let response = success_function({
                statusCode: 200,
                message: "movie added succesfully"
            });

            res.status(response.statusCode).send(response);
            return;
        }
        else {

            let response = error_function({
                statusCode: 400,
                message: "failed to add the movie!"
            });

            res.status(response.statusCode).send(response);
            return;

        }

    }
    catch (error) {
        console.log(error.message ? error.message : error);
        let response = error_function({
            statusCode: 400,
            message: error.message ? error.message : error
        });

        res.status(response.statusCode).send(response);
        return;
    }

}

exports.deletemovie = async (req, res) => {

    try {

        let id = req.params.id;
        console.log("id from req :", id);

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            let response = error_function({
                statusCode: 400,
                message: 'Invalid or missing movie ID!'
            });
            return res.status(response.statusCode).send(response);
        }

        let _id = new mongoose.Types.ObjectId(id);
        console.log(id);


        let deletemovie = await movies.deleteOne({ _id });


        if (deletemovie) {
            let response = success_function({
                statusCode: 200,
                message: 'movie deleted succesfully'
            })
            res.status(response.statusCode).send(response);
        }
        else {
            let response = error_function({
                statusCode: 400,
                message: 'failed to delete the movie!'
            })
            res.status(response.statusCode).send(response);

        }


    }
    catch (error) {

        console.log(error.message ? error.message : error);
        let response = error_function({
            statusCode: 400,
            message: error.message ? error.message : error
        })

        res.status(response.statusCode).send(response);

    }

}

exports.getallmovies = async (req, res) => {

    try {


        let data = await movies.find().populate({ path: "genres", select: "-__v" }).select("-__v");
        console.log("data :", data);
        let response = success_function({
            statusCode: 200,
            data,
        });
        res.status(response.statusCode).send(response);

    }
    catch (error) {
        console.log(error.message ? error.message : error);
        let response = error_function({
            statusCode: 400,
            message: error.message ? error.message : error

        })
        res.status(response.statusCode).send(response);
    }


}
exports.getsinglemovie = async (req, res) => {

    try {
        
        let id = req.params.id;
        let _id = new mongoose.Types.ObjectId(id);

        let data = await movies.findOne({_id}).select("-__v")
        console.log("data :", data);
        let response = success_function({
            statusCode: 200,
            data,
        });
        res.status(response.statusCode).send(response);

    }
    catch (error) {
        console.log(error.message ? error.message : error);
        let response = error_function({
            statusCode: 400,
            message: error.message ? error.message : error

        })
        res.status(response.statusCode).send(response);

    }


}

exports.updatemovie = async (req,res) =>{
    try{
        
        let data = req.body;

        let thumbnail = req.body.thumbnail;
        let background_image = req.body.background_image;

        let regExp = /^data:/;
        let result = regExp.test(background_image);
        

        if (result) {
            try {
                let img_path = await fileUpload(background_image, "bg_images");
                console.log("Background image path:", img_path);
                data.background_image = img_path;
            } catch (error) {
                console.log("Background image upload failed:", error.message);
                return res.status(400).send({ message: "Failed to upload background image" });
            }
        }

        if (thumbnail) {
            let img_path = await fileUpload(thumbnail, "thumbnails");
            console.log("img_path :", img_path);
            data.thumbnail = img_path;
        }
        

        let id = req.body.id;
        let _id = new mongoose.Types.ObjectId(id);
        delete data.id;

        console.log("data for update:",data);

        updatemovie = await  movies.updateOne({_id},{$set : data});

        if(updatemovie){
            let response = success_function({
                statusCode: 200,
                message : "movie updated succesfully"
            });
            res.status(response.statusCode).send(response);

        }
        else{

            console.log(error.message ? error.message : error);
            let response = error_function({
                statusCode: 400,
                message: "failed to update the movie"
    
            })
            res.status(response.statusCode).send(response);

        }
    }
    catch(error){
        console.log(error.message ? error.message : error);
        let response = error_function({
            statusCode: 400,
            message: error.message ? error.message : error

        })
        res.status(response.statusCode).send(response);
    }
}
