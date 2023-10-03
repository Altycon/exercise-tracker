const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

const mongoDbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

module.exports.connectDatabase = function (){
    mongoose.connect(process.env.MONGO_URI, mongoDbOptions)
    .then( ()=> {
        console.log('Mongoose Database connected')
    })
    .catch( (error)=> console.log('MongooseError', error));
};