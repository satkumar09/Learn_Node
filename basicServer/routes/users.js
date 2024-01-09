//encaptulate all routes inside a single file

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send("User list")
})

router.get('/new', (req, res) => {
  res.render("users/new", {firstName: "Test"})           //shows error: res.send(status, body): Use res.status(status).send(body) instead routes\users.js:11:7

}) //try putting it above any dynamic route as the 'new' can interpreted as id

router.post('/', (req, res) => {
  res.send('Create User')
})

//dynamic routing
/*
router.get('/:id', (req, res) => {
  res.send(`Get User With ID: ${req.params.id}`)
})

router.put('/:id', (req, res) => {
  res.send(`Update User With ID: ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
  res.send(`Delete Get User With ID: ${req.params.id}`)
})
*/

//Better way

router.route('/:id').get((req, res) => {
  console.log(req.user)     // {name: "Sally"}  for key 1
  res.send(`Get User With ID: ${req.params.id}`)
}).put((req, res) => {
  res.send(`Update User With ID: ${req.params.id}`)
}).delete((req, res) => {
  res.send(`Delete Get User With ID: ${req.params.id}`)
})





const users = [{name: "kyle"}, {name: "Sally"}]
router.param("id",(req, res, next, id) => {
  //console.log(id)
  req.user = users[id]
  next()           //to run the next code           -> (get(/:id)  in our case)
})

module.exports = router