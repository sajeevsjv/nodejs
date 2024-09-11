const users = require('../db/models/users');

exports.createUser = async () => {

    try {
        body = req.body;
        console.log("body:", body);

        let name = body.name;
        console.log("name:", name);

        let email = body.email;
        console.log("email:", email);

        let passsword = body.passsword;
        console.log("password:", passsword);

        //validation
        if (!name) {
            res.status(400).send("name is required");
            return;
        }

        let count = await users.countDocuments({ email });
        if (count > 0) {
            res.status(400).send("user already exists");
            return;
        }

        let new_user = await users.create(body);
        if (new_user) {
            res.status(200).send("user created successfully");
            return;
        }
        else {
            res.status(400).send("user creation failed");
            return;
        }
    }
    catch(error){
        console.log("error:",error);
        res.status(400).send(error.message ? error.message : "something wet wrong")

    }
}

exports.getAllUsers = async function(req, res) {
    try {
        let usersData = await users.find();
        console.log("usersData : ", usersData);
    
        res.status(200).send(usersData);
        return;
    } catch (error) {
        console.log("error : ", error);
        res.status(400).send(error.message ? error.message : error);
    }
}

exports.getSingleUser = async function(req, res) {
    try {
        let id = req.params.id;
        console.log("id : ", id);
    
        let userData = await users.find({_id : id});
        console.log("userData : ", userData);
    
        res.status(200).send(userData);
        return;
    } catch (error) {
        console.log("error : ", error);
        res.status(400).send(error.message ? error.message : error);
    }
}
