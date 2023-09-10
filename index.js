const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const productRoute = require('./routes/products')
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");


dotenv.config()

const mongoUrl = process.env.MONGO_DB_SECRET_KEY
const port = process.env.PORT || 4000

mongoose.connect(mongoUrl).then(() => console.log('DB connection successful')).catch(err => console.log("err", err)
)

const app = express()

app.use(express.json())

app.use('/api/products', productRoute)
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


app.listen(port, () => {
  console.log("Server running");
  
})

