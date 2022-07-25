const vacationsDal = require("../dal/vacations-dal");
const pushLogic = require("./push-logic");

async function getAllVacations(){
    let vacations = await vacationsDal.getAllVacations();
    return vacations;
}

async function addVacation(vacationDetails) {

    validateVacationData(vacationDetails);
    let vacationId = await vacationsDal.addVacation(vacationDetails);
    vacationDetails.id = vacationId;
    let jsonVacation = JSON.stringify(vacationDetails);
    pushLogic.broadcast("add-or-edit-vacation", jsonVacation)
    return vacationId;   
}


async function editVacation(vacationDetails) {

    validateVacationData(vacationDetails);
    let jsonVacation = JSON.stringify(vacationDetails);
    pushLogic.broadcast("add-or-edit-vacation", jsonVacation);
    await vacationsDal.editVacation(vacationDetails);;
    
}

async function deleteVacation(vacationId) {
    await vacationsDal.deleteVacation(vacationId);
    pushLogic.broadcast("delete-vacation", vacationId);
}

function validateVacationData(vacationDetails){
    if(!vacationDetails.destination){
        throw new Error("destination must contain letters");
    }
    if(vacationDetails.destination.length>12){
        throw new Error("The maximum number of characters permitted is 12");
    }

    if(!vacationDetails.price){
        throw new Error("price must be added");
    }
    if(vacationDetails.price>50000 || vacationDetails.price<1){
        throw new Error("price must be between 1 and 50000");
    }

    if(!vacationDetails.beginningDate){
        throw new Error("beginning date must be entered");
    }

    if(!vacationDetails.endingDate){
        throw new Error("ending date must be entered");
    }

    if(vacationDetails.beginningDate>=vacationDetails.endingDate){
        throw new Error("ending date must be after beginning date");
    }

    if(!vacationDetails.image){
        throw new Error("image must be entered");
    }
    
    if(!vacationDetails.description){
        throw new Error("description must be entered");
    }
    if(vacationDetails.description.length>1000){
        throw new Error("description length can't be more than 1000 characters");
    }
}

module.exports = {
    getAllVacations,
    addVacation,
    editVacation,
    deleteVacation
}