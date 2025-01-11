import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import axios from "axios";
import connectDB from "./Database.config.js";
import updateCurrencies from "./Controller/updateController.js";
import statsRouter from "./Route/stats.js";
import deviatonRouter from "./Route/deviation.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api/v1/stats" , statsRouter);
app.use("/api/v1/deviation" , deviatonRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Schedule the API call every 2 hours
cron.schedule("0 */2 * * *", async () => {
  try {
    console.log("Scheduled task running...");
    const response = await axios.get(process.env.API_URL);
    console.log("API Response:", response.data);
    await updateCurrencies(response.data);
    console.log("Currencies updated successfully");
  } catch (error) {
    console.error("Error calling API:", error.message);
  }
});
