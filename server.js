// dependencies------------------------------
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000
const path = require ('path')
const fileUpload = require('express-fileupload')


// database connection ----------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
    .then(() => console.log("db connected!"))
    .catch(err => console.error("db connection failed ", err))

  // articles database connection -------------
 mongoose.createConnection(process.env.ARTICLES_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
})

  .then(() => console.log("db article connected!"))
  .catch(err => console.error("db connect articles failed", err))

// express app setup -----------------------
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('*', cors())
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }
}))

// routes-----------------------------

// homepage
app.get('/', (req, res) => {
  res.send("homepage")
})


// auth
const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

// user
const userRouter = require('./routes/user')
app.use('/user', userRouter)

// articles
const articlesRouter = require('./routes/article')
app.use('/', articlesRouter)

// run app listen on port --------------------
// app.listen(port, () => {
//   console.log("App running on ", 'http://localhost:3000');
// });

app.listen(port, () => {
  console.log("App running on ", 'https://cauld-ruckus-backend.herokuapp.com/');
});