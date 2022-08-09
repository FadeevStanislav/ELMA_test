const usersLine = document.querySelector(".planner_lines-user");
let plannerUser = null;
let plannerDay = null;

function allowDrop(e) {
  e.preventDefault();
}

function dropInUser(e) {
  let taskId = e.dataTransfer.getData("id");
  let date = interSearchTaskDayById(taskId);
  let userId = e.target.id;
  if (interCheckWorkloadInDate(userId, date) < 3) {
    interAddTaskForUser(taskId, userId);
    interDeleteBacklogItemById(taskId);
    interRerender();
  }
}

function dropInDay(e) {
  let taskId = e.dataTransfer.getData("id");
  let sectionDay = e.target.id;
  let [userId, day] = sectionDay.split("-");
  if (interCheckWorkloadOnDayThisWeek(userId, day)) {
    interAddTaskForUser(taskId, userId, day);
    interDeleteBacklogItemById(taskId);
    interRerender();
  }
}

function draggablePlannerZone() {
  plannerUser = document.querySelectorAll(".planner_zone-user");
  plannerUser.forEach((item) => {
    item.ondragover = allowDrop;
    item.ondrop = dropInUser;
  })

  plannerDay = document.querySelectorAll(".planner_zone-day");
  plannerDay.forEach((item) => {
    item.ondragover = allowDrop;
    item.ondrop = dropInDay;
  })
}

function createDayItem(taskForDay, userId) {
  let resultHTML = "";
  for (let day = 1; day < 8; day++) {
    let overloadDay = "";
    let countTasks = 0;
    let resultDayHTML = "";
    taskForDay[day - 1].forEach((item) => {
      countTasks += 1;
      resultDayHTML += `<div 
                class="user-task-for-day"
                data-title="
                Начало: ${item.creationDate}, 
                Конец: ${item.planEndDate}">
            ${item.subject}
            </div>`;
    })
    if (countTasks > 0) overloadDay = "not-overload-day";
    if (countTasks === 3) overloadDay = "overload-day";
    resultHTML += `<div class="line-grid_day${day} planner_zone-day ${overloadDay}" id="${userId}-${day}">${resultDayHTML}</div>`;
  }
  return resultHTML;
}

function createUserLine(firstName, surname, lineUser, userId) {
  return (`
        <div class="line-grid line-grid_users">
            <div class="line-grid_user planner_zone-user" id="${userId}">${firstName} ${surname}</div>
            ${lineUser}          
        </div>
    `)
}

function tasksForDay(queueOnWeek, dates) {
  let tasksForDay = [[], [], [], [], [], [], []]
  queueOnWeek.forEach((item) => {
    let date = item.planStartDate.split("-");
    dates.forEach((dateItem, index) => {
      if (date[2] == dateItem.day) {
        tasksForDay[index].push(item);
      }
    })
  })
  return tasksForDay;
}

function tasksForWeek(queue, dates) {
  let start = new Date(dates[0].year, dates[0].month, dates[0].day)
  let stop = new Date(dates[6].year, dates[6].month, dates[6].day)
  return queue.filter((item) => {
    let date = item.planStartDate.split("-");
    let taskDate = new Date(date[0], date[1], date[2]);
    return inRange(taskDate, start, stop);
  })
}

function convert(d) {
  return (
    d.constructor === Date ? d :
      d.constructor === Array ? new Date(d[0], d[1], d[2]) :
        d.constructor === Number ? new Date(d) :
          d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year, d.month, d.date) :
              NaN
  );
}

function inRange(d, start, end) {
  return (
    isFinite(d = convert(d).valueOf()) &&
      isFinite(start = convert(start).valueOf()) &&
      isFinite(end = convert(end).valueOf()) ?
      start <= d && d <= end : NaN
  );
}

function updateUsersInTable(users, dates) {
  usersLine.innerHTML = ""
  users.forEach((user) => {
    let lineUser = "";
    if (user.tasks.length !== 0) {
      user.tasksForWeek = tasksForWeek(user.tasks, dates);
      user.tasksForDay = tasksForDay(user.tasksForWeek, dates);
    }
    lineUser = createDayItem(user.tasksForDay, user.id);
    usersLine.innerHTML += createUserLine(user.firstName, user.surname, lineUser, user.id);
  })
  draggablePlannerZone();
}