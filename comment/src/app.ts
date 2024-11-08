import express from "express"
import router from "./routes/commentRoute"
import dotenv from "dotenv"
import dbConnection from "./config/dbConnection"

const app = express()
dotenv.config()
dbConnection()
app.use(express.json());
app.use(router)


app.listen(3002 , ()=> {
    console.log(`Server running on http://localhost:3002/`);
})