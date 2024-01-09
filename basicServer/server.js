const express = require('express')
const app = express()

//To render static files
//app.use(express.static("public"))
//server can either work on static or dynamic

//To use logger
app.use(logger)

//To use ejs
app.set('view engine','ejs')

//set different routes: 
app.get('/', (req,res) => {
  console.log('Here');
  
  //res.send("Hi")
  //res.sendStatus(500).send("Hi")
  //res.sendStatus(500).json({message: "Error"})

  //res.json({message: "Error"})
  //res.download("server.js")    //will create a download option every time user refresh page

  //res.render('index')      //will render the file mentioned at the time of get call
  //will give error: No default engine was specified and no extension was provided.

  //To solve this we need to install a view engine:  npm i ejs

  res.render('ind', {text:"world"})  

})

//setup to use all the routers present in routes/users.js file
const userRouter = require('./routes/users')
app.use('/users', userRouter)


//middleware

function logger(req, res, next){
  console.log(req.originalUrl)      //    /             --> original Url
  next()
}

app.listen(3000)