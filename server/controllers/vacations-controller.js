const vacationsLogic = require("../logic/vacations-logic");
const followsLogic = require("../logic/follows-logic");
const express = require("express");
const router = express.Router();

// GET ALL VACATIONS
// GET http://localhost:3000/vacations
router.get("/", async (request, response) => { 
    try{
       let vacations = await vacationsLogic.getAllVacations();
        response.json(vacations);
    }
    catch(e){
        console.error(e);
        response.status(600).send(e.message);
    }
});

// ADD VACATION
// POST http://localhost:3000/vacations
router.post("/", async (request, response) => {
    let vacationDetails = request.body;
    try {
        let vacationId = await vacationsLogic.addVacation(vacationDetails);
        response.json(vacationId);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);        
    }
});

// EDIT VACATION
// PUT http://localhost:3000/vacations
router.put("/", async (request, response) => {
    let vacationDetails = request.body;
    try {
        await vacationsLogic.editVacation(vacationDetails);
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);        
    }
});

// DELETE VACATION
// DELETE http://localhost:3000/vacations/vacationId
router.delete("/:id", async (request, response) => {
    let vacationId = request.params.id;
    try {
        await followsLogic.deleteVacation(vacationId)
        await vacationsLogic.deleteVacation(vacationId);
        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);        
    }
});

module.exports = router;


 