
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/registration"; // Replace 'admin' with your actual database name
// const mongoURI = process.env.mongoURl;
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Mongoose is Connected");
    } catch (error) {
        
        console.error("Failed to connect to MongoDB", error);
    }
};


module.exports=connectToMongo;
