const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const dbConnect = require('./dbConnect');
const userRoute = require('./routes/userRoute')

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(cors());

dbConnect();


app.use("/api/user", userRoute)


app.listen(PORT, ()=>{
    console.log("server is listening at PORT", PORT);
})