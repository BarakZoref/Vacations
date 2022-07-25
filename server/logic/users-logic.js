const usersDal = require("../dal/users-dal");
const followsDal = require("../dal/follows-dal");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const validator = require('validator');



async function addUser(userRegistrationData) {
    
    validateUserData(userRegistrationData);
    if (await usersDal.isUserNameExist(userRegistrationData.userName)) {
        throw new Error("User name already exist");
    }
    normalizeOptionalRegistrationData(userRegistrationData);
    userRegistrationData.password = encryptPassword(userRegistrationData.password);
    await usersDal.addUser(userRegistrationData);    
}

async function logIn(userLogInData){

    userLogInData.password = encryptPassword(userLogInData.password);
    let userData = await usersDal.logIn(userLogInData);
    if (!userData){
        throw new Error("Login failed");
    }

    let userfollows = await followsDal.getUserFollows(userData.userId);
    let followedVacationsArray = [];
    for (let follow of userfollows) {
        followedVacationsArray.push(follow.vacation_id);
    }

    const token = jwt.sign({ userId: userData.userId, userType:userData.userType}, config.secret);
    let successfulLoginResponse = {token, firstName: userData.firstName, lastName: userData.lastName, followedVacationsArray: followedVacationsArray};
    return successfulLoginResponse;
    
}


function validateUserData(userRegistrationData) {
    if (!validator.isEmail(userRegistrationData.userName)) {
        throw new Error("user name is invalid");
    }

    if (!userRegistrationData.password) {
        throw new Error("Invalid password");
    }
   
    if (userRegistrationData.password.length < 6) {
        throw new Error("Password is too short");
    }

    if(!userRegistrationData.firstName){
        throw new Error("first name field can't be empty");
    }
    
    if(userRegistrationData.firstName.length>12){
        throw new Error("first name is too long");
    }

    if(userRegistrationData.lastName.length>12){
        throw new Error("last name is too long");
    }

}

function encryptPassword(password) {
    const saltRight = "sdkjfhdskajh";
    const saltLeft = "--mnlcfs;@!$ ";
    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}

function normalizeOptionalRegistrationData(userRegistrationData){
    if (!userRegistrationData.lastName){
        userRegistrationData.lastName = "";
    }    
}


module.exports = {
    addUser,
    logIn
}