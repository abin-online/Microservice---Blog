import express from "express"
import dotenv from "dotenv"
import router from "./routes/postRoutes"
import dbConnection from "./config/dbConnection"
import consume from "./kafka/consumer"

const app = express()
dotenv.config()
dbConnection()
app.use(express.json());
app.use(router)
consume()

app.get('/', (req, res) => {
    res.json('From post'); // Send a JSON response
});

app.listen(3003 , ()=> {
    console.log(`Server running on http://localhost:3003/`);
})