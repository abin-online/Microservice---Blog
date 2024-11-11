import express from "express"
import router from "./routes/commentRoute"
import dotenv from "dotenv"
import dbConnection from "./config/dbConnection"
import consume from "./kafka/consumer"

const app = express()
dotenv.config()
dbConnection()
app.use(express.json());
app.use(router)
consume()

app.get('/', (req, res) => {
    res.json("from comment"); // Send a JSON response
});

app.listen(3002 , ()=> {
    console.log(`Server running on http://localhost:3002/`);
})