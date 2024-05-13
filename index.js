import express from "express";
import bodyParser from "body-parser";
import  mongoose from "mongoose";
import usersRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js";

const app = express();
const PORT = 5000;
app.use(express.urlencoded({extended: true}));
app.use(express.json())
//connecting
mongoose.connect('mongodb+srv://imDUMB:ygpmRB4Fa4b%2AjQR@cluster0.rfcbu.mongodb.net/test',
{ useNewUrlParser: true,useUnifiedTopology: true },
()=>console.log('connected!!')
);
//routes
app.use("/users", usersRoutes);
app.use("/signup", loginRoutes);
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));