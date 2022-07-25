const connection = require("./connection-wrapper");

async function addUser(userDetails) {
    let sql = "INSERT INTO users (user_name, first_name, last_name, password, user_type) VALUES(?, ?, ?, ?, ?)";
    let parameters = [userDetails.userName, userDetails.firstName, userDetails.lastName, userDetails.password, userDetails.userType];
    await connection.executeWithParameters(sql, parameters);
}

async function logIn(user){
    let sql = `SELECT id as userId, first_name as firstName, last_name as lastName,
     user_type as userType FROM users WHERE user_name = ? AND password = ? ;`;    
    let parameters = [user.userName, user.password];
    let [userData] = await connection.executeWithParameters(sql, parameters);
    if (!userData){
        return null;
    }
    return userData;
}

async function isUserNameExist(userName){
    let sql = "SELECT id FROM users where user_name = ?";
    let parameters = [userName];
    let user = await connection.executeWithParameters(sql, parameters);
    if(user && user.length > 0 ){
        return true;
    }
    return false;
}

module.exports = {
    addUser,
    logIn,
    isUserNameExist
}