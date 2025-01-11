import mongoose from "mongoose";

const currencySchema = new mongoose.Schema({
  CryptoCurrencyName: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  current_price: {
    type: String,
  },
  market_cap: {
    type: String,
  },
  market_cap_rank: {
    type: String,
  },
  low_24h: {
    type: String,
  },
  high_24h: {
    type: String,
  },
  price_change_24h: {
    type: String,
  },
  historicalPrices: {
    type: [Number], // Array to store historical price data 
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to ensure historicalPrices array length is 100
currencySchema.pre("save", function (next) {
  if (this.historicalPrices.length > 100) {
    this.historicalPrices.splice(0, this.historicalPrices.length - 100); // Remove oldest entries
  }
  next();
});

const Currency = mongoose.model("Currency", currencySchema);
export default Currency;
