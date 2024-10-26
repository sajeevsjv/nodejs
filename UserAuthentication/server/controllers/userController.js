const users = require('../db/models/users');
const { success_function, error_function } = require('../utils/response-handler');
const bcrypt = require('bcrypt');
const sendEmail = require("../utils/send-email").sendEmail;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const otpVerification = require("../utils/email-templates/otpVerification").otpVerification;

exports.signup = async function (req, res) {
  try {

    let body = req.body;
    console.log("body : ", body);


    let name = req.body.name;
    console.log("name : ", name);

    let emails = req.body.email;
    console.log("email : ", emails);

    password = body.password;

    let count = await users.countDocuments({email : emails});
    console.log("count : ", count);

    if(count > 0){
        let response = error_function({
            statusCode : 400,
            message : "user already exists"
        })
        res.status(response.statusCode).send(response);
        return;
    }
    
    //validations required
    if(!name) {
        let response = error_function({
            statusCode : 400,
            message : 'Name is required'
        });
        res.status(response.statusCode).send(response);
        return;
    }

    const  salt = bcrypt.genSaltSync(10);
    const hashed_password = bcrypt.hashSync(password,salt);

    body.password = hashed_password;

    function generateOTP() {
      // Generate a random number between 100000 and 999999 (inclusive)
      let otp = Math.floor(100000 + Math.random() * 900000);
      return otp.toString();  // Convert to string if you need it as a string
    }
    let otp = generateOTP();

    body.otp = otp;
    console.log("body :",body);

    let user = await users.create(body);
    if(user){
        let content = await otpVerification(name,emails,otp);
        await sendEmail(emails,"Otp Verification",content);

        if(sendEmail){
          let response = success_function({
            statusCode : 200,
            message : 'OTP has been sent to your email. Please verify.'
        });
        res.status(response.statusCode).send(response);
        return;
        }
        else{
          let response = error_function({
            statusCode : 400,
            message : 'Failed to send otp'
        });
        res.status(response.statusCode).send(response);
        return;
        }
        
    }
    else{
      let response = error_function({
        statusCode : 400,
        message : 'user creation failed.'
    });
    res.status(response.statusCode).send(response);
    return;
    }

  } catch (error) {
    console.log("error : ", error);
    res.status(400).send(error.message ? error.message : "Something went wrong");
    return;
  }
}


exports.otpVerification = async function (req, res) {
  try {
  // verifying otp
   let otp = req.body.otp;
   if (otp) {
     let user = await users.findOne({otp});
     if (user) {
         let response = success_function({
           statusCode: 200,
           message: 'Signup successful! You can now log in and start using your account.'
         });
         res.status(response.statusCode).send(response);
         user.otp = null;
         let updateuser = await users.updateOne({_id :user._id } ,{ $set : {otp : null}})
         return;  
     }
     else {
       let response = error_function({
         statusCode: 400,
         message: 'invalid otp'
         
       });
       res.status(response.statusCode).send(response);
       return;
     }
   }

  }
  catch (error) {
    console.log(error.message ? error.message : error);
    let response = error_function({
      statusCode: 200,
      message: error.message ? error.message : error
    });
    res.status(response.statusCode).send(response);
    return;
  }
}
