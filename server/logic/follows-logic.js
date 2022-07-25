const followsDal = require("../dal/follows-dal");

async function deleteVacation(vacationId){
    await followsDal.deleteVacation(vacationId);
}

async function addFollow(userId, vacationId){
    await followsDal.addFollow(userId, vacationId);
}

async function deleteFollow(userId, vacationId){
    await followsDal.deleteFollow(userId, vacationId);
}

async function getUserFollows(userId){
    let userfollows = await followsDal.getUserFollows(userId);
    let followedVacationsArray = [];
    for (let follow of userfollows) {
        followedVacationsArray.push(follow.vacation_id);
    }
    return followedVacationsArray;
}

module.exports = {
    deleteVacation,
    addFollow,
    deleteFollow,
    getUserFollows
}