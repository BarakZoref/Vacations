const connection = require("./connection-wrapper");

async function getAllVacations() {
    let sql = `SELECT v.id, v.destination, v.price, v.beginning_date as beginningDate, v.ending_date as endingDate, v.image, v.description, count(f.vacation_id) as numOfFollowers
                FROM vacations v left join follows f on v.id = f.vacation_id
                 GROUP BY v.id`;    
    let vacations = await connection.execute(sql);    
    return vacations;
}

async function addVacation(vacationDetails) {
    let sql = "INSERT INTO vacations (destination, price, beginning_date, ending_date, image, description) VALUES(?, ?, ?, ?, ?,?)";
    let parameters = [vacationDetails.destination, vacationDetails.price, vacationDetails.beginningDate, vacationDetails.endingDate, vacationDetails.image, vacationDetails.description];
    let userData = await connection.executeWithParameters(sql, parameters);
    return userData.insertId;
}

async function editVacation(vacationDetails) {
    let sql = "UPDATE vacations SET destination = ?, price = ?, beginning_date = ?, ending_date = ?, image = ?, description = ? WHERE id = ?;"
    let parameters = [vacationDetails.destination, vacationDetails.price, vacationDetails.beginningDate, vacationDetails.endingDate, vacationDetails.image, vacationDetails.description, vacationDetails.id];
    await connection.executeWithParameters(sql, parameters);
}

async function deleteVacation(vacationId) {
    let sql = "DELETE FROM vacations WHERE id = ?;"  
    let parameters = [vacationId];
    await connection.executeWithParameters(sql, parameters);
}


module.exports = {
    getAllVacations,
    addVacation,
    editVacation,
    deleteVacation
}