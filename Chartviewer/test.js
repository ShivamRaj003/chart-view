// Sample data set
const data = [
    { name: "Alpha", value: 12 },
    { name: "Beta", value: 25 },
    { name: "Gamma", value: 8 },
    { name: "Delta", value: 16 }
];

const viewSelect = document.getElementById("viewSelect");
const dataDisplay = document.getElementById("dataDisplay");
const chartCanvas = document.getElementById("chart");

function renderList() {
    chartCanvas.style.display = "none";
    let ul = document.createElement('ul');
    data.forEach((item) => {
        let li = document.createElement('li');
        li.textContent = `${item.name}: ${item.value}`;
        ul.appendChild(li);
    });
    dataDisplay.innerHTML = "";
    dataDisplay.appendChild(ul);
}

function renderTable() {
    chartCanvas.style.display = "none";
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let trow = document.createElement("tr");
    let inp=["Name", "Value"];
    inp.forEach((data) => {
        let thight = document.createElement("th");
        thight.textContent = data;
        trow.appendChild(thight);
    });
    thead.appendChild(trow);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");
    data.forEach(item => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.textContent = item.name;
        let td2 = document.createElement("td"   );
        td2.textContent = item.value;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    dataDisplay.innerHTML = "";
    dataDisplay.appendChild(table);
}

let chart; 
function renderChart(type) {
    dataDisplay.innerHTML = "";
    chartCanvas.style.display = "block";
    let labels = data.map(item => item.name);
    let values = data.map(item => item.value);
    if (chart) chart.destroy();
    chart = new Chart(chartCanvas, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: "Values",
                data: values,
                backgroundColor: ["#4287f5", "#42f5da", "#bc42f5", "#f5cf42"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: type !== "bar"
                }
            }
        }
    });
}

viewSelect.addEventListener("change", function() {
    const view = viewSelect.value;
    if (view === "list") renderList();
    else if (view === "table") renderTable();
    else if (view === "bar") renderChart("bar");
    else if (view === "pie") renderChart("pie");
});

// Initial view
renderList();