const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/markDownNotes?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
// const dbURL = 'mongodb+srv://shivamcse:16104653@cluster0.5a59j.mongodb.net/inotebooks?retryWrites=true&w=majority'
// const dbURL = 'mongodb+srv://shivamcse:16104653@cluster0.2dsac.mongodb.net/signUpAndInPage?retryWrites=true&w=majority'
const connectToMongo = () =>{
    mongoose.connect(dbURL).then(() => {
        console.log("Database connected")
    }).catch((err) => console.log("no connection from database"));
}

module.exports = connectToMongo;