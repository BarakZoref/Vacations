const tokenDecoder = require("../utils/token-decoder");
const followsLogic = require("../logic/follows-logic")
const express = require("express");
const router = express.Router();



// ADD FOLLOW
// POST http://localhost:3000/follows
router.post("/", async (request, response) => {
    let vacationId = request.body.vacationId;
    let userDetails = tokenDecoder.decodeTokenFromRequest(request);
    let userId = userDetails.userId;
    try {
        await followsLogic.addFollow(userId, vacationId);
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);        
    }
});

// REMOVE FOLLOW
// DELETE http://localhost:3000/follows/vacationId
router.delete("/:id", async (request, response) => {
    let vacationId = request.params.id;
    let userDetails = tokenDecoder.decodeTokenFromRequest(request);
    let userId = userDetails.userId;
    try {
        await followsLogic.deleteFollow(userId, vacationId);
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);        
    }
});

// GET FOLLOWED VACATIONS OF USER
// GET http://localhost:3000/follows
router.get("/", async (request, response) => { 
    try{
        let userDetails = tokenDecoder.decodeTokenFromRequest(request);
        let userId = userDetails.userId;
       let followedVacationsArray = await followsLogic.getUserFollows(userId);
        response.json(followedVacationsArray);
        return followedVacationsArray;
    }
    catch(e){
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;