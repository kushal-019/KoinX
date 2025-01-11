import express from 'express'
import dotenv from "dotenv";
import connectDB from './Config/Database.config.js';

const app = express();


app.use(express.json());

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT , ()=>{
    console.log("App Running");
});


const cron = require('node-cron');
const axios = require('axios');

// Schedule the API call every 10 minutes
cron.schedule('* */2 * * *', () => {
  console.log('Running scheduled task...');
  axios.get(process.env.API_URL)
    .then(response => {
      console.log('API called successfully:', response.data);
    })
    .catch(error => {
      console.error('Error calling API:', error.message);
    });
});

