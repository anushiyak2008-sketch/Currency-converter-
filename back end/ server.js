// Import Express
const express = require("express");

// Import CORS
const cors = require("cors");

// Create application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Currency Conversion API
app.get("/api/convert", async (req, res) => {

    try {

        // Get values from frontend
        const { from, to, amount } = req.query;

        // Validate input
        if (!from || !to || !amount ||
            Number(amount) <= 0) {

            return res.status(400).json({
                error: "Invalid input"
            });
        }

        // Get exchange rate
        const response = await fetch(
            `https://api.frankfurter.app/latest?from=${from}&to=${to}`
        );

        const data = await response.json();

        // Calculate conversion
        const rate = data.rates[to];
        const result = Number(amount) * rate;

        // Send result to frontend
        res.json({

            fromCurrency: from,
            toCurrency: to,
            amount: Number(amount),
            exchangeRate: rate,
            convertedAmount: result

        });

    } catch (error) {

        res.status(500).json({
            error: "Currency conversion failed"
        });

    }

});

// Start server
app.listen(3000, () => {

    console.log("Server running on port 3000");

});