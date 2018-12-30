const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoute");


mongoose.connect(
  "mongodb://localhost/tcbc2_demo",
  { useNewUrlParser: true },
  () => {
    console.log("DB Connected");
  }
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(passport.initialize());
// require("./middlewares/passportJwt.js")(passport);

app.use('/api/user', userRouter)

app.listen(2222, ()=> {
    console.log('Server is running')
})