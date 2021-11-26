const mongoose = require("mongoose")
require('dotenv').config()
const MONGO_DB_URL = process.env.MONGODB_URL
mongoose.connect(MONGO_DB_URL,
    {useNewUrlParser:true,
        useUnifiedTopology : true}
).catch(err=>{console.log(err)})
const database = mongoose.connection
database.once("open",()=>{

})
module.exports = database