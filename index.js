function calculateDecimal() {
    if (!hideDecimalCheckbox.checked) {
        const binarySwitches = Array.prototype.slice.call(document.querySelectorAll('.binaryList')).reverse();

        let decimalValue = 0;

        binarySwitches.forEach((switchInput, index) => {
            if (switchInput.children[0].classList.contains("one-card")) {
                decimalValue += Math.pow(2, index);
            }
        });

        document.getElementById('decimal-value').textContent = decimalValue;
    }
}

const hideDecimalCheckbox = document.querySelector("#decimalCheckbox");
hideDecimalCheckbox.addEventListener("change", () => {
    if (hideDecimalCheckbox.checked) {
        document.getElementById('decimal-value').textContent = "???";
    } else {
        calculateDecimal()
    }
});

const binaryHeader = document.getElementById('binaryHeader');
const binaryPower = document.getElementById('binaryPower');
const binaryBody = document.getElementById('binaryBody');
const maxDecimalValue = 128;

var power = 0
for (let decimal = 1; decimal <= maxDecimalValue; decimal *= 2) {
    const newHeader = document.createElement("th")
    newHeader.textContent = decimal;
    binaryHeader.appendChild(newHeader);

    const newPower = document.createElement("td")
    newPower.innerHTML = `2<sup>${power}</sup>`
    power++;
    binaryPower.appendChild(newPower);

    const newBodyItem = document.createElement("td")
    Sortable.create(newBodyItem, {
        swap: true,
        swapClass: "text-bg-success",
        animation: 150,
        onSort: calculateDecimal,
    });
    newBodyItem.classList.add("binaryList")
    newBodyItem.innerHTML = `
<div class="card text-bg-secondary mb-3 zero-card" style="max-width: 18rem;">
<div class="card-body mx-auto">
<h5 class="card-title">0</h5>
</div>
</div>
<div class="card text-bg-info mb-3 one-card" style="max-width: 18rem;">
<div class="card-body mx-auto">
<h5 class="card-title">1</h5>
</div>
</div>
`;
    binaryBody.appendChild(newBodyItem)
}
for (var i = 1; i < binaryHeader.childNodes.length; i++){
    binaryHeader.insertBefore(binaryHeader.childNodes[i], binaryHeader.firstChild);
    binaryPower.insertBefore(binaryPower.childNodes[i], binaryPower.firstChild);
}