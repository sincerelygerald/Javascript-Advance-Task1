const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btnSort = document.getElementById("btnSort");
const btnIdentify = document.getElementById("btnIdentify");
const sortOrder = document.getElementById("sortOrder");

const tbl = document.getElementById("tblNumbers");

let numbersArr = [];
let highestRow, lowestRow; // Store the highest and lowest rows

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
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }
    highestRow = null;
    lowestRow = null;
    document.getElementById("btn4").style.display = "none";
});

// Sort Button Click Event
btnSort.addEventListener("click", () => {
    if (sortOrder.value === "asc") {
        numbersArr.sort((a, b) => a - b);
    } else {
        numbersArr.sort((a, b) => b - a);
    }
    iterateNumbers();
});

// Identify Highest & Lowest Button Click Event
btnIdentify.addEventListener("click", () => {
    if (numbersArr.length > 0) {
        const highest = Math.max(...numbersArr);
        const lowest = Math.min(...numbersArr);

        if (!highestRow) {
            highestRow = createInfoRow(`HIGHEST: ${highest}`, "red");
            tbl.appendChild(highestRow);
        } else {
            highestRow.firstChild.textContent = `HIGHEST: ${highest}`;
            highestRow.style.display = "table-row";
        }

        if (!lowestRow) {
            lowestRow = createInfoRow(`LOWEST: ${lowest}`, "blue");
            tbl.appendChild(lowestRow);
        } else {
            lowestRow.firstChild.textContent = `LOWEST: ${lowest}`;
            lowestRow.style.display = "table-row";
        }
    }
});

// Function to create a row for Highest & Lowest
function createInfoRow(text, color) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.style.color = color;
    td.style.fontWeight = "bold";
    td.textContent = text;
    tr.appendChild(td);
    tr.style.display = "none"; // Hidden initially
    return tr;
}

function deleteNumber(i) {
    numbersArr.splice(i, 1);
    iterateNumbers();
}

function editNumber(i) {
    const editTxt = prompt("Enter new number:", numbersArr[i]);
    const regex = /^[0-9]+$/;

    if (editTxt == null || editTxt == "") {
        alert("You did not input a new value!");
    } else if (editTxt.match(regex)) {
        numbersArr[i] = parseInt(editTxt);
        iterateNumbers();
    } else {
        alert("You did not input a valid number!");
    }
}

function iterateNumbers() {
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if (numbersArr.length > 0) {
        for (let i = 0; i < numbersArr.length; i++) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = numbersArr[i];

            td2.style.width = "70px";
            td2.style.color = numbersArr[i] % 2 === 0 ? "green" : "blue";
            td2.innerHTML = numbersArr[i] % 2 === 0 ? "EVEN" : "ODD";

            btnDelete.setAttribute("onclick", `deleteNumber(${i})`);
            btnDelete.innerHTML = "Remove"; 

            btnEdit.setAttribute("onclick", `editNumber(${i})`);
            btnEdit.innerHTML = "Edit";

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbl.appendChild(tr);
        }

        // Hide highest/lowest rows if they exist
        if (highestRow) highestRow.style.display = "none";
        if (lowestRow) lowestRow.style.display = "none";
    } else {
        if (highestRow) highestRow.style.display = "none";
        if (lowestRow) lowestRow.style.display = "none";
    }
}