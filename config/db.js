const mongoose = require('mongoose');
const dbConnect = async () => {
    try {
       const connected = await mongoose.connect('mongodb://localhost:27017/DatabaseFilter');
       console.log(`mongodb successfully connected ${connected.connection.host}`)
    }
    catch (error){
        console.log(error.message);
    }
}
module.exports = dbConnect;