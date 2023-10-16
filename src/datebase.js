const mongoose = require ('mongoose');

require('dotenv').config()


/* 
const MONGODB_URI = process.env.MONGODB_URI;

 `mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })`;
        console.log('DB is connected');
 */



 const DB = () => {
    const {USER_NAME, DB_PASSWORD}= process.env
    mongoose.connect(`mongodb+srv://${USER_NAME}:${DB_PASSWORD}@cluster0.hvxvolp.mongodb.net/?retryWrites=true&w=majority`),{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }

    }
    console.log(
        'DB is connected')

DB() 

