import Currency from "../Modal/Store.js";

const statsController=async(req,res)=>{

    try{
    const coin = req.params.coin;
    console.log(req.params);

    if (!coin) {
        return res.status(400).json({ error: "Coin is required" });
      }
  
      const result = await Currency.findOne({ id: coin });
  
      if (!result) {
        return res.status(404).json({ error: "Currency not found" });
      }

      res.status(200).json({
        price: result.current_price,
        marketCap: result.market_cap,
        "24hChange": result["price_change_24h"],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }

};

export default statsController;