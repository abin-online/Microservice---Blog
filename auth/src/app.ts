import express from "express"
import mongoose from "mongoose"
import router from "./routes/userRouter"

const app = express()
app.use(express.json())

import dbConnection from "./config/dbConnection"

dbConnection()

app.use('/' , router)

app.listen(3001 , ()=> {
    console.log(`Server running on http://localhost:3001/`);
})