const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btnSortAsc = document.getElementById("btnSortAsc");
const btnSortDesc = document.getElementById("btnSortDesc");

const highestValue = document.getElementById("highest");
const lowestValue = document.getElementById("lowest");

const tbl = document.getElementById("tblNumbers");

let total = 0;
let numbersArr = [];

function insertNumber() {
    const txtNumber = document.getElementById("txtNum").value;
    let regex = /^[0-9]+$/; 

    if (txtNumber.match(regex)) {
        let num = parseInt(txtNumber);
        numbersArr.push(num);
        document.getElementById("txtNum").value = "";
    } else {
        alert("Please input a positive number");
        document.getElementById("txtNum").value = "";
        return;
    }

    updateHighLow();
    iterateNumbers();
}

btn1.addEventListener("click", insertNumber);
document.getElementById("txtNum").addEventListener("keydown", function(event) {
    if (event.key === "Enter") insertNumber();
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }
    highestValue.textContent = "HIGHEST: N/A";
    lowestValue.textContent = "LOWEST: N/A";
    document.getElementById("btn4").style.display = "none";
});

btn4.addEventListener("click", () => {
    const trTotal = document.createElement("tr");
    const tdTotalLabel = document.createElement("td");
    const tdTotalValue = document.createElement("td");

    trTotal.style.height = "30px";

    tdTotalLabel.style.fontWeight = "bold";
    tdTotalLabel.innerHTML = "TOTAL";

    tdTotalValue.style.textDecoration = "underline";
    tdTotalValue.innerHTML = total;
        
    trTotal.appendChild(tdTotalLabel);
    trTotal.appendChild(tdTotalValue);
    tbl.appendChild(trTotal);
});

function deleteNumber(i) {
    numbersArr.splice(i, 1);
    updateHighLow();
    iterateNumbers();
}

function editNumber(i) {
    const editTxt = prompt("Enter new number:", numbersArr[i]);
    const regex = /^[0-9]+$/; 

    if (editTxt == null || editTxt == "") {
        alert("You did not input a new value!");
    } else if (editTxt.match(regex)) {
        numbersArr[i] = parseInt(editTxt);
        updateHighLow();
        iterateNumbers();
    } else {
        alert("You did not input a valid number!");
    }
}

function sortNumbers(order) {
    if (order === "asc") {
        numbersArr.sort((a, b) => a - b);
    } else if (order === "desc") {
        numbersArr.sort((a, b) => b - a);
    }
    iterateNumbers();
}

btnSortAsc.addEventListener("click", () => sortNumbers("asc"));
btnSortDesc.addEventListener("click", () => sortNumbers("desc"));

function updateHighLow() {
    if (numbersArr.length > 0) {
        highestValue.textContent = `HIGHEST: ${Math.max(...numbersArr)}`;
        lowestValue.textContent = `LOWEST: ${Math.min(...numbersArr)}`;
    } else {
        highestValue.textContent = "HIGHEST: N/A";
        lowestValue.textContent = "LOWEST: N/A";
    }
}

function iterateNumbers() {
    while (tbl.hasChildNodes()) {
       