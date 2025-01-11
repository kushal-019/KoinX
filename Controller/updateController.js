import Currency from "../Modal/Store.js";

const updateCurrencies = async (cryptoData) => {
  try {
    for (const crypto of cryptoData) {
      // Destructure necessary fields from the API response
      const {
        id,
        name,
        symbol,
        image,
        current_price,
        market_cap,
        market_cap_rank,
        low_24h,
        high_24h,
        price_change_24h,
      } = crypto;

      await Currency.findOneAndUpdate(
        { symbol },
        {
          id : id,
          CryptoCurrencyName: name,
          symbol,
          image,
          current_price: current_price.toString(),
          market_cap: market_cap.toString(),
          market_cap_rank: market_cap_rank.toString(),
          low_24h: low_24h.toString(),
          high_24h: high_24h.toString(),
          price_change_24h: price_change_24h.toString(),
          $push: { historicalPrices: current_price },
        },
        { new: true, upsert: true }
      );
    }
    console.log("Database updated successfully!");
  } catch (error) {
    console.log("Error updating database:", error.message);
  }
};

export default updateCurrencies;
