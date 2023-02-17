window.onload = function () {
  pieChartDraw();
  document.getElementById('legend-div').innerHTML = window.pieChart.generateLegend();
  setLegendOnClick();
}

let pieChartData = {
  labels: ['foo', 'bar', 'baz', 'fie', 'foe', 'fee'],
  datasets: [{
      data: [95, 12, 13, 7, 13, 10],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)']
  }] 
};

let pieChartDraw = function () {
  let ctx = document.getElementById('pieChartCanvas').getContext('2d');
  
  window.pieChart = new Chart(ctx, {
      type: 'pie',
      data: pieChartData,
      options: {
          responsive: false,
          legend: {
              display: false
          },
          legendCallback: customLegend
      }
  });
};

let customLegend = function (chart) {
  let ul = document.createElement('ul');
  let color = chart.data.datasets[0].backgroundColor;

  chart.data.labels.forEach(function (label, index) {
      ul.innerHTML += `<li data-index="${index}"><span style="background-color: ${color[index]}"></span>${label}</li>`;
  });

  return ul.outerHTML;
};

let setLegendOnClick = function () {
  let liList = document.querySelectorAll('#legend-div ul li');

  for (let element of liList) {
      element.onclick = function () {
          updateChart(event, this.dataset.index, "pieChart");
          
          if (this.style.textDecoration.indexOf("line-through") < 0) {
              this.style.textDecoration = "line-through";
          } else {
              this.style.textDecoration = "";
          }
      }
  }
};

let updateChart = function (e, datasetIndex, chartId) {
let index = datasetIndex;
let chart = e.view[chartId];
let i, ilen, meta;

for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
    meta = chart.getDatasetMeta(i);

    if (meta.data[index]) {
        meta.data[index].hidden = !meta.data[index].hidden;
    }
}

chart.update();
};

// Create an empty array to hold the tasks
let tasks = [];

// Get the task input and task list elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Function to add a task
function addTask() {
  // Get the task description from the input element
  const taskDescription = taskInput.value;

  // Add the task to the array
  tasks.push({ description: taskDescription, completed: false });

  // Clear the input element
  taskInput.value = "";

  // Update the task list
  updateTaskList();
}

// Function to update the task list
function updateTaskList() {
  // Clear the task list element
  taskList.innerHTML = "";

  // Loop through the tasks array and add each task to the list
  for (let i = 0; i < tasks.length; i++) {
    // Create a list item element for the task
    const taskItem = document.createElement("li");

    // Create a checkbox element for the task
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tasks[i].completed;
    checkbox.onclick = () => {
      tasks[i].completed = !tasks[i].completed;
      updateTaskList();
    };

    // Create a label element for the task description
    const taskLabel = document.createElement("label");
    taskLabel.innerText = tasks[i].description;

    // Add the checkbox and label elements to the list item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskLabel);

    // Add the list item to the task list
    taskList.appendChild(taskItem);
  }
}
