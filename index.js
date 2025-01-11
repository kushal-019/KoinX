import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import axios from "axios";
import connectDB from "./Database.config.js";
import updateCurrencies from "./Controller/updateController.js";

const app = express();

app.use(express.json());

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("App Running");
});


// Schedule the API call every 2 hours
cron.schedule("* */2 * * *", async() => {
  try {
    const response =await axios.get(process.env.API_URL);
    console.log(response.data)
    updateCurrencies(data);
  } catch (e) {
    console.error("Error calling API:", error.message);
  }
});
