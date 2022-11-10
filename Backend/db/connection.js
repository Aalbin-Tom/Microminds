const mongoose = require("mongoose");

const connectDB = () => {
    try {
        const conn = mongoose.connect('mongodb://127.0.0.1:27017/microminds')
        console.log(`connected mongo`);
    } catch (error) {
        console.log(`error:${error}`);
        process.exit();
    }
}
module.exports = connectDB 