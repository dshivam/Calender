const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysinWeek = 7;
const daysinWeekArr = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
let currDisplayDate;

class DateTime {
  constructor(date) {
    this.date = date;
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.currentDateText = `${months[this.month]} ${this.year}`;
    this.numberofDays = new Date(this.year, this.month + 1, 0).getDate();
    this.firstOfMonth = new Date(this.year, this.month, 1).getDay();
    this.lastOfMonth = new Date(this.year, this.month + 1, 0).getDay();
    this.totalDaysinGrid = this.numberofDays + this.firstOfMonth + daysinWeek - this.lastOfMonth - 1;
    this.daysinLastMonth = new Date(this.year, this.month, 0).getDate();
  }
}

window.onload = () => {
  const currDate = new Date();
  currDisplayDate = currDate;
  createCalender(currDate);
}

function ifToday(date) {
  return date.getDate() == new Date().getDate() && date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear();
}
function ifCurrentMonth(date) {
  return date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear();
}
function incrementMonth(unit) {
  currDisplayDate = new Date(currDisplayDate.getFullYear(), currDisplayDate.getMonth() + unit, 1);
  createCalender(ifCurrentMonth(currDisplayDate) ? new Date() : currDisplayDate);
}
function incrementYear(unit) {
  currDisplayDate = new Date(currDisplayDate.getFullYear() + unit, currDisplayDate.getMonth(), 1);
  createCalender(ifCurrentMonth(currDisplayDate) ? new Date() : currDisplayDate);
}

function createCalender(date) {
  const dateObj = new DateTime(date);
  const dateText = document.getElementById('date1');
  dateText.innerText = dateObj.currentDateText;
  const dates2dArr = [daysinWeekArr.map(item => {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'tile';
    dayDiv.innerText = item;
    return dayDiv;
  })];
  let dateRows = [];
  const table = document.createElement('table');
  const tBody = document.createElement('tbody');
  for (let i = 1 - dateObj.firstOfMonth; i <= dateObj.numberofDays + daysinWeek - dateObj.lastOfMonth - 1; i += 1) {
    const dayDiv = document.createElement('div');
    dayDiv.className = ifToday(date) && i === date.getDate() ? 'tile active' : 'tile';
    if (i <= 0) {
      dayDiv.innerText = dateObj.daysinLastMonth + i;
      dayDiv.style.color = 'lightgray';
    } else if (i > dateObj.numberofDays) {
      dayDiv.innerText = i - dateObj.numberofDays;
      dayDiv.style.color = 'lightgray';
    } else {
      dayDiv.innerText = i;
    }
    if (dateRows.length !== 7) {
      dateRows.push(dayDiv);
    } else {
      dates2dArr.push(dateRows);
      dateRows = [dayDiv];
    }
  }
  dates2dArr.push(dateRows);
  for (let i = 0; i < dates2dArr.length; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < dates2dArr[i].length; j++) {
      const td = document.createElement('td');
      td.appendChild(dates2dArr[i][j]);
      tr.appendChild(td);
    }
    tBody.appendChild(tr);
  }
  table.appendChild(tBody);
  const calender = document.getElementById('calender');
  if (calender.innerHTML) {
    calender.innerHTML = '';
  }
  calender.appendChild(table);
}