class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
  perimeter() {
    return 2 * (this.width + this.height);
  }
}

let count = 0;

function saveTasksToLocalStorage() {
  const tableBody = document.getElementById("tableBody");
  const rows = Array.from(tableBody.querySelectorAll("tr"));
  const data = rows.map(row => {
    const cells = row.querySelectorAll("td");
    return {
      width: cells[1].textContent,
      height: cells[2].textContent,
      area: cells[3].textContent,
      perimeter: cells[4].textContent
    };
  });
  localStorage.setItem("rectangles", JSON.stringify(data));
}

function loadTasksFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("rectangles") || "[]");
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  count = 0;
  data.forEach(item => {
    const row = document.createElement("tr");
    count++;
    row.innerHTML = `
      <td>${count}</td>
      <td>${item.width}</td>
      <td>${item.height}</td>
      <td>${item.area}</td>
      <td>${item.perimeter}</td>
      <td><button class="deleteBtn"><i class="fa-solid fa-trash"></i></button></td>
    `;
    tableBody.appendChild(row);
  });
}

function calculate() {
  const width = parseFloat(document.getElementById("width").value);
  const height = parseFloat(document.getElementById("height").value);
  const tableBody = document.getElementById("tableBody");

  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    alert("Please enter valid positive numbers.");
    return;
  }

  const rect = new Rectangle(width, height);
  const area = rect.area();
  const perimeter = rect.perimeter();

  const row = document.createElement("tr");
  count++;
  row.innerHTML = `
    <td>${count}</td>
    <td>${width}</td>
    <td>${height}</td>
    <td>${area}</td>
    <td>${perimeter}</td>
    <td><button class="deleteBtn"><i class="fa-solid fa-trash"></i></button></td>
  `;
  tableBody.appendChild(row);

  saveTasksToLocalStorage();

  // Clear inputs
  document.getElementById("width").value = '';
  document.getElementById("height").value = '';
}

// Event delegation for delete buttons
// This allows deleting any row, even if added after page load

document.getElementById("tableBody").addEventListener("click", function(e) {
  // Fix: support clicking the icon inside the button
  const btn = e.target.closest(".deleteBtn");
  if (btn) {
    btn.closest("tr").remove();
    saveTasksToLocalStorage();
  }

 

  
});

 

document.getElementById("calculateBtn").addEventListener("click", calculate);
document.getElementById("calculateBtn").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent form from submitting/reloading
  calculate();
});


  document.getElementById("height").addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
      calculate();
    }
  })

  document.getElementById("width").addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
      calculate();
    }
  })

// Load tasks from localStorage on page load
loadTasksFromLocalStorage();
