"use strict";

const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const router = new express.Router();
const jsonschema = require("jsonschema");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
// const Ticker = require("../models/ticker.js.HELP");

const app = express();
const port = 3001;

const access_key=process.env.ACCESS_KEY

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getStartDate() {   // 3 months ago from today
  const today = new Date();
  const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
  const year = threeMonthsAgo.getFullYear();
  const month = String(threeMonthsAgo.getMonth() + 1).padStart(2, '0'); 
  const day = String(threeMonthsAgo.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


router.get("/api/data/:symbols",async function(req, res) {
  try {

const symbols = req.params.symbols;   
console.log(`Symbols ${symbols}`)


const URL = `http://api.marketstack.com/v1/eod?access_key=${access_key}&symbols=${symbols}&date_from=${getStartDate()}&date_to=${getToday()}`;

console.log(` MY URL -- ${URL}`);
    
    const response = await axios.get(URL);
    res.json(response.data);

  } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
  }
});

module.exports = router;
