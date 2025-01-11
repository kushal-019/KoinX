import Currency from "../Modal/Store.js";

function calculateStandardDeviation(arr) {
  if (arr.length === 0) return 0;

  const mean = arr.reduce((sum, value) => sum + value, 0) / arr.length;

  const squaredDifferences = arr.map((value) => Math.pow(value - mean, 2));

  const variance =
    squaredDifferences.reduce((sum, value) => sum + value, 0) / arr.length;

  const standardDeviation = Math.sqrt(variance);

  return standardDeviation;
}

const deviatonController = async (req, res) => {
  try {
    const coin = req.params.coin;
    console.log(coin);

    if (!coin) {
      return res.status(400).json({ error: "Coin is required" });
    }

    const result = await Currency.findOne({ id: coin });

    if (!result) {
      return res.status(404).json({ error: "Currency not found" });
    }

    const array = result.historicalPrices;
    const stdDeviation = calculateStandardDeviation(array);

    res.status(200).json({
      deviation: stdDeviation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default deviatonController;
