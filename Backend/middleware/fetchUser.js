const jwt = require('jsonwebtoken')
const jwt_secret = "shivamsahucse2019iiitg.ac.inb.tech";

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');

    if(!token){ 
        res.status(401).send({error:'Please authenticate with valid token'});
    }
    try {
        const data = jwt.verify(token, jwt_secret);
        req.user = data.user;
        // console.log("hhh - ", data.user);
        next()
    } catch (error) {
        res.status(401).send({error:'Please authenticate with valid token'});
        
    }

}

module.exports = fetchUser