const tokenDecoder = require("../utils/token-decoder");
const usersLogic = require("../logic/users-logic")
const express = require("express");
const router = express.Router();

// ADD USER
// POST http://localhost:3000/users
    router.post("/", async (request, response) => {

        let userRegistrationData = request.body;
        userRegistrationData.userType = "user";
        try {
            await usersLogic.addUser(userRegistrationData);
            response.json();
        }
        catch (e) {
            console.error(e);
            response.status(600).send(e.message);        
        }
    });

    // LOG IN
    // POST http://localhost:3000/users/login
    router.post("/login", async (request, response) => { 
        let userLogInData = request.body;
        try{
           let successfulLoginResponse = await usersLogic.logIn(userLogInData);
    
            response.json(successfulLoginResponse);
        }
        catch(e){
            console.error(e);
            response.status(600).send(e.message);
        }
    });




module.exports = router;

