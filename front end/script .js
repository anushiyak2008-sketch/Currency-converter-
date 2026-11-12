const amount = document.getElementById("amount");

const fromCurrency = document.getElementById("fromCurrency");

const toCurrency = document.getElementById("toCurrency");

const convert = document.getElementById("convert");

const result = document.getElementById("result");

const rate = document.getElementById("rate");

const swap = document.getElementById("swap");

// Currency conversion function

async function convertCurrency() {

    let value = Number(amount.value);

    let from = fromCurrency.value;

    let to = toCurrency.value;

    if (amount.value === "" || value <= 0) {
        result.innerHTML = "Please enter a valid amount!";
        rate.innerHTML = "";
        return;
    }

    try {

        const response = await fetch(
            `https://open.er-api.com/v6/latest/${from}`
        );

        const data = await response.json();

        if (data.result !== "success") {
            throw new Error("Exchange rate unavailable");
        }

        let exchangeRate = data.rates[to];

        let convertedAmount = value * exchangeRate;

        result.innerHTML =
            `${convertedAmount.toFixed(2)} ${to}`;

        rate.innerHTML =
            `1 ${from} = ${exchangeRate.toFixed(4)} ${to}`;

    }

    catch (error) {

        result.innerHTML = "Unable to convert currency.";

        rate.innerHTML = "Please check your internet connection.";

    }

}

// Convert button

convert.addEventListener("click", convertCurrency);

// Swap currencies

swap.addEventListener("click", function() {

    let temp = fromCurrency.value;

    fromCurrency.value = toCurrency.value;

    toCurrency.value = temp;

});