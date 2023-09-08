function calculateDecimal(event) {
    if (!otherCheckbox.checked) {
        const binarySwitches = document.querySelectorAll('#simpleList');

        let decimalValue = 0;

        binarySwitches.forEach((switchInput, index) => {
            if (switchInput.children[0].classList.contains("one-card")) {
                decimalValue += Math.pow(2, index);
            }
        });

        document.getElementById('decimal-value').textContent = decimalValue;
    }
}

// Create binary switches for decimal numbers 1, 2, 4, 8, 16, 32, 64, etc.
// const binaryContainer = document.getElementById('binary-container');
const binaryHeader = document.getElementById('binary-header');
const binaryBody = document.getElementById('binary-body');
const maxDecimalValue = 256; // You can adjust this as needed

for (let decimal = 1; decimal <= maxDecimalValue; decimal *= 2) {
    const newHeader = document.createElement("th")
    newHeader.textContent = decimal;
    binaryHeader.appendChild(newHeader);

    const switchInput = document.createElement('input');
    switchInput.type = 'checkbox';
    switchInput.classList.add("binary-switch")
    switchInput.addEventListener('change', calculateDecimal);

    const newBodyItem = document.createElement("td")
    Sortable.create(newBodyItem, {
        swap: true,
        swapClass: "text-primary",
        animation: 150,
        onSort: calculateDecimal,
    });
    newBodyItem.id = "simpleList"
    newBodyItem.innerHTML = `
<div class="card text-bg-secondary mb-3 zero-card" style="max-width: 18rem;">
<div class="card-body">
<h5 class="card-title">0</h5>
</div>
</div>
<div class="card text-bg-success mb-3 one-card" style="max-width: 18rem;">
<div class="card-body">
<h5 class="card-title">1</h5>
</div>
</div>
`;
    binaryBody.appendChild(newBodyItem)
}




const otherCheckbox = document.querySelector("#scales");
otherCheckbox.addEventListener("change", () => {
    if (otherCheckbox.checked) {
        document.getElementById('decimal-value').textContent = "???";
    } else {
        calculateDecimal()
    }
});