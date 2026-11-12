async function convertCurrency() {

    let amount = document.getElementById("amount").value;

    let from = document.getElementById("from").value;

    let to = document.getElementById("to").value;

    const response = await fetch(
        `http://localhost:3000/api/convert?from=${from}&to=${to}&amount=${amount}`
    );

    const data = await response.json();

    document.getElementById("result").innerHTML =
        data.convertedAmount.toFixed(2);

}