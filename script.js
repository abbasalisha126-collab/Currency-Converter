
// Currency Converter

const form = document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const result = document.getElementById("result");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const amount = Number(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!Number.isFinite(amount) || amount <= 0) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    if (!from || !to) {
        result.textContent = "Please select both currencies.";
        return;
    }

    if (from === to) {
        result.textContent =
            `${amount.toFixed(2)} ${from} = ${amount.toFixed(2)} ${to}`;
        return;
    }

    result.textContent = "Converting...";

    try {
        const url =
            `https://open.er-api.com/v6/latest/${from}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch exchange rates.");
        }

        const data = await response.json();

        if (
            data.result !== "success" ||
            !data.rates ||
            typeof data.rates[to] !== "number"
        ) {
            throw new Error("Exchange rate is unavailable.");
        }

        const rate = data.rates[to];
        const convertedAmount = amount * rate;

        result.textContent =
            `${amount.toFixed(2)} ${from} = ` +
            `${convertedAmount.toFixed(2)} ${to}`;

    } catch (error) {
        console.error("Currency conversion error:", error);
        result.textContent =
            "Conversion failed. Please check your internet connection and try again.";
    }
});
