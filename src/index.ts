import express from "express";
import mongoose, { connect } from "mongoose";
import userRoute from "./routes/userRoute";

const app = express();
const port = 3001;
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce").then(() => {
  console.log("data base connected");
});

app.use('/user',userRoute)

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
