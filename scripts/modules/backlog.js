const backLog = document.querySelector(".backlog_tasks");
const backlogInput = document.querySelector("#backlog-input");
backlogInput.oninput = searcher;
let draggableTask = null;

function searcher() {
  let value = this.value.toLowerCase();
  let elasticItems = document.querySelectorAll(".backlog_tasks-item p");
  if (value !== "") {
    elasticItems.forEach((item) => {
      if (item.innerText.toLowerCase().search(value) === -1) {
        item.classList.add("backlog_hide");
        item.parentNode.classList.add("backlog_hide");
      }
      else {
        item.classList.remove("backlog_hide");
        item.parentNode.classList.remove("backlog_hide");
      }
    })
  } else {
    elasticItems.forEach((item) => {
      item.classList.remove("backlog_hide");
      item.parentNode.classList.remove("backlog_hide");
    })
  }
}

function drag(e) {
  e.dataTransfer.setData("id", e.target.id);
}

function updateDraggableBacklogZone() {
  draggableTask = document.querySelectorAll(".draggable_task");
  draggableTask.forEach((item) => {
    item.ondragstart = drag;
  })
}

function createTaskInBacklog(name, id) {
  return (`
        <div class="backlog_tasks-item draggable_task" id="${id}" draggable="true">
            <p id="backlog-items-text">${name}</p>
        </div>
    `)
}

function updateBacklog(backlog) {
  backLog.innerHTML = ""
  backlog.forEach((item) => {
    backLog.innerHTML += createTaskInBacklog(item.subject, item.id);
  })
  updateDraggableBacklogZone();
}