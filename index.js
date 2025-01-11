import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import axios from "axios";
import connectDB from "./Database.config.js";
import updateCurrencies from "./Controller/updateController.js";
import statsRouter from "./Route/stats.js";
import deviationRouter from "./Route/deviation.js";

dotenv.config();

const app = express();

app.use(express.json());

const startServer = async () => {
  try {
    // Connect to the database
    console.log("Connecting to the database...");
    await connectDB();
    console.log("Database connected successfully.");

    app.use("/api/v1/stats", statsRouter);
    app.use("/api/v1/deviation", deviationRouter);

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });

    // Run the task immediately after the database connection is established
    await runTask();

    cron.schedule("0 */2 * * *", runTask);

  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1); 
  }
};

// Task function
const runTask = async () => {
  try {
    console.log("Task running...");
    const response = await axios.get(process.env.API_URL);
    console.log("API Response:", response.data);
    await updateCurrencies(response.data);
    console.log("Currencies updated successfully");
  } catch (error) {
    console.error("Error during task execution:", error.message);
  }
};

// Start the server and database connection
startServer();
