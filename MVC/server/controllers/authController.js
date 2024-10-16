const users = require("../db/models/users");
const {success_function, error_function} = require("../utils/response-handler"); 
const bcrypt = require('bcrypt');

exports.login = async (req,res) =>{
    try{
        let email = req.body.email;
        console.log("email :",email);

        let password = req.body.password;
        console.log("password:",password);

        //validations
        let user = await  users.findOne({email});
        console.log("user :",user);

        if(user){
            let db_password = user.password;
            console.log("db_password :",db_password);
            
            let passwordMatch = bcrypt.compareSync(password,db_password);
            console.log("passwordMatch :",passwordMatch);

            if(passwordMatch){
                let response = success_function({
                    statusCode : 200,
                    message : "Login succesful"
                });

                res.status(response.statusCode).send(response);
                return;
            }
            else{
                let response = error_function({
                    statusCode : 400,
                    message : "Invalid password"
                });

                res.status(res.statusCode).send(response);
            }
        }

        else{
            let response = error_function ({
                statusCode : 400,
                message : "user not found"

            });

            res.status(response.statusCode).send(response);
        }
    }
    catch(error){
        console.log("error:",error);

        let response = error_function({
            statusCode :400,
            message : error.message ? error.message : "something went wrong"
        })
    }
}