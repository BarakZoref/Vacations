const jwt_decode = require('jwt-decode');

function decodeTokenFromRequest(request){
    let token = request.headers.authorization;
    let decodedToken = jwt_decode(token);
    return decodedToken;
}

module.exports = {
    decodeTokenFromRequest
}