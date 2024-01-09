const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb+srv://satkumar2929:x0pR6Lsug2wVGsTr@test-login-db.eipzoy8.mongodb.net/?retryWrites=true&w=majority")
//Pass:x0pR6Lsug2wVGsTr

//to check if the connection was successful
connect.then(() => {
  console.log("Database connected Successfully");
}).catch(() => {
  console.log("Database cannot be connected");
})

//Creating a schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

//Collection Part
const collection = new mongoose.model("users", LoginSchema)

module.exports = collection