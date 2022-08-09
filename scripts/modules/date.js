const datesLine = document.querySelector(".planner_lines-dates");
const buttonNextWeek = document.querySelector(".planner_button_right");
const buttonPreviousWeek = document.querySelector(".planner_button_left");

buttonNextWeek.onclick = () => {
  interOnClickNextWeek();
}

buttonPreviousWeek.onclick = () => {
  interOnClickPreviousWeek();
}

function createDateLine(dates) {
  const cells = dates.map(date => `<div class="line-grid_day1 line-grid-date">${date.day}.${date.month}</div>`)
  datesLine.innerHTML = `<div class="line-grid_user"></div>`;
  for (let i = 0; i < cells.length; i++) {
    datesLine.innerHTML += cells[i];
  }
}

function updateDateInTable(dates) {
  datesLine.innerHTML = "";
  createDateLine(dates);
}