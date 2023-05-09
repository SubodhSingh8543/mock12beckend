const express = require("express");
const { connect } = require("./db");
const { userRoute } = require("./routes/userRoutes");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/user",userRoute);

app.listen(process.env.port,async()=>{
    try {
        await connect;
        console.log("connection created");
    } catch (error) {
        console.log("dissconnected ")
    }
})

