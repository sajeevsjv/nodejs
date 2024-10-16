const books = require("../db/models/books")
const { success_function, error_function} = require("../utils/response-handler")
exports.addbook = async (req,res) => {
    try{
        let data = req.body;
        console.log("data :",data);

        addbook = books.create(data);
        if(addbook){
            response = success_function({
                message : "Book added succesfully" 
            })

            res.status(response.statusCode).send(response.message);
        }
        else{
            response = error_function({
                message : "failed to add book"
            })
        }
    }
    catch(error){
        console.log(error.message ? error.message : "something went wrong");
    }
}