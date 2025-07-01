
const BASE_URL = "https://open.er-api.com/v6/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Fill dropdowns with countryList codes
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const from = fromCurr.value.toUpperCase();
    const to = toCurr.value.toUpperCase();
    const URL = `${BASE_URL}/${from}`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        let rate = data.rates[to];
       
        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${from} = ${finalAmount.toFixed(2)} ${to}`;
    } catch (error) {
        msg.innerText = "Something went wrong. Please try again!";
        console.error("Error fetching exchange rate:", error);
    }
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
    updateFlag(fromCurr);
    updateFlag(toCurr);

});
