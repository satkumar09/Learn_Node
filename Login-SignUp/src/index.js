const express = require("express");
const path = require("path"); //inbuilt
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

//convert data into JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use ejs as the view engine
app.set("view engine", "ejs");
//static file
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

//Register User
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  //to send this data in database (before we check if user already exists)
  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.send("User already exists!! Please choose a different username.");
  } else {
    //hash the password using bcrypt
    const saltRounds = 10; //Number of salt round for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds)

    data.password = hashedPassword         //secured password

    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});

//Login user
app.post("/login", async (req, res) => {
  try{
    const check = await collection.findOne({name: req.body.username})
    if(!check){
      res.send("User name not found!! Try again")
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
    if(isPasswordMatch){
      res.render("home")
    }else{
      res.send("Wrong Password!! Try again")
    }
  }catch{
    res.send("Wrong Details");
  }
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});
