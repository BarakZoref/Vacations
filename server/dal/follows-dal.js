const connection = require("./connection-wrapper");

async function deleteVacation(vacationId) {
    let sql = "DELETE FROM follows WHERE vacation_id = ?;"
    let parameters = [vacationId];
    await connection.executeWithParameters(sql, parameters);
}

async function addFollow(userId, vacationId) {
    let sql = "INSERT INTO follows (user_id, vacation_id) VALUES(?, ?)";
    let parameters = [userId, vacationId];
    await connection.executeWithParameters(sql, parameters);
}

async function deleteFollow(userId, vacationId) {
    let sql = "DELETE FROM follows WHERE user_id = ? and vacation_id = ?;"
    let parameters = [userId, vacationId];
    await connection.executeWithParameters(sql, parameters);
}

async function getUserFollows(userId){
    let sql = "SELECT vacation_id FROM follows where user_id = ?;"
    let parameters = [userId];
    let userfollows = await connection.executeWithParameters(sql, parameters);
    return userfollows;
}

module.exports = {
    deleteVacation,
    addFollow,
    deleteFollow,
    getUserFollows
}