import express from "express";
import {readdirSync} from "fs";
import  Mongoose  from "mongoose";
const morgan = require("morgan");
import cors from "cors";
 require("dotenv").config();


//create express app
const app = express();

//apply middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/", (req, res,next )=> {
    console.log("my middleware")
next();
});

//routes
readdirSync("./routes").map((r)=>
    app.use("/api", require(`./routes/${r}`))
);

//db
Mongoose
    .connect(process.env.DATABASE, {

    
    }).then(()=> console.log("**DB Connected**"))
    .catch((err) => console.log("DB connection error =>", err));

//ports 
const port= process.env.PORT || 8000  

//listen

app.listen(port,()=> console.log(`SERVER is running on port ${port}`));
