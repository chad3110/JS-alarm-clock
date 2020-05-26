const openBtn = document.querySelector("#alarm-btn");
const addAlarmBtn = document.querySelector("#add-alarm");
const listArea = document.querySelector("#saved-alarms");
const alarmSound = document.querySelector("#alarm-sound");

const settingsArea = document.querySelector("#settings-area");
//variables for the time @ clock()
let now;
let hours;
let mins;
let secs;

//variables for the date and the day @ showDate()
let dayIndex;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "friday",
  "Saturday",
];

//open the alarm settings area
function openAlarmSettings() {
  //add/remove the css class that changes opacity and sets display to none
  listArea.classList.add("dont-show");
  openBtn.classList.add("dont-show");
  settingsArea.classList.remove("dont-show");

  const closeBtn = document.querySelector("#settings-close-btn");
  closeBtn.addEventListener("click", closeSettings);

  //function to close the settings screen
  function closeSettings() {
    //add/remove the css class that changes opacity and sets display to none
    listArea.classList.remove("dont-show");
    openBtn.classList.remove("dont-show");
    settingsArea.classList.add("dont-show");
  }
}

//function to add new alarms
function addAlarm() {
  const inputDate = document.querySelector("#input-date");
  const inputTime = document.querySelector("#input-time");
  const inputText = document.querySelector("#input-text");

  //create html elements
  const elemForm = document.createElement("form");
  //const elemInput = document.createElement("input");
  const elemImg = document.createElement("img");
  const elemLabel = document.createElement("label");

  //add the text from the inputs to the HTML elements
  elemLabel.innerHTML = `${inputDate.value} @ ${inputTime.value} - ${inputText.value}`;
  //the attributes must be set seperately otherwise it returns undefined
  elemImg.src = "images/bin.svg";
  elemImg.setAttribute("class", "delete-alarm-btn");
  //add the elements to the HTML alarm list area
  elemForm.append(elemImg);
  elemForm.append(elemLabel);
  listArea.append(elemForm);
  alert("alarm Added");

  //clear the entered information after alarm is added
  inputDate.value = "";
  inputTime.value = "";
  inputText.value = "";
}

function runAlarm() {
  const alarmScreen = document.querySelector("#alarm-alert-screen");
  const alarmScreenText = document.querySelector("#alarm-screen-text");
  const endAlarmBtn = document.querySelector("#end-alarm-btn");
  const alarms = document.querySelectorAll("#saved-alarms form");
  let currYear = now.getFullYear();
  let currMonth = now.getMonth();
  let currDate = now.getDate();

  let currHours = now.getHours();
  let currMins = now.getMinutes();

  //number formatting for hours
  if (currHours < 10) {
    currHours = "0" + now.getHours();
  } else {
    currHours = now.getHours();
  }

  //number formatting for minutes
  if (currMins < 10) {
    currMins = "0" + now.getMinutes();
  } else {
    currMins = now.getMinutes();
  }

  //number formatting for month
  if (currMonth < 10) {
    currMonth = "0" + (now.getMonth() + 1);
  } else {
    currMonth = now.getMonth() + 1;
  }

  /*need to add check for seconds otherwise the alarm will run while in the 
    current minute*/
  /*loop through alarms, check every form element, if the forms last child, which is the label element,
    matches the conditional then the alarm alert screen pops up */
  alarms.forEach((form) => {
    if (
      form.lastChild.innerHTML.includes(
        `${currYear}-${currMonth}-${currDate} @ ${currHours}:${currMins}`
      ) &&
      now.getSeconds() == 0
    ) {
      //show alarm screen and insert text
      alarmScreenText.innerHTML = form.lastChild.innerHTML;
      alarmScreen.classList.remove("dont-show");
      listArea.classList.add("dont-show");
      openBtn.classList.add("dont-show");
      settingsArea.classList.add("dont-show");
      //play the sound from the beggining everytime
      alarmSound.currentTime = 0;
      alarmSound.play();
      //repeat the song until endAlarm button is pressed
      alarmSound.loop = true;
    }
  });

  endAlarmBtn.addEventListener("click", endAlarm);

  function endAlarm() {
    /*remove text from the screen; make alarm screen invisible; make openBtn and
      listArea visible again*/
    alarmSound.pause();
    alarmScreenText.innerHTML = " ";
    alarmScreen.classList.add("dont-show");
    listArea.classList.remove("dont-show");
    openBtn.classList.remove("dont-show");
  }
}

//shows the day and date on the display
function showDate() {
  //select the html objects
  const dayDisplay = document.querySelector("#day");
  const dateDisplay = document.querySelector("#date");

  //vars to get the day
  const now = new Date();
  dayIndex = now.getDay();

  //change the format of the date
  const dateKeeper = now.toString().split(" ").slice(1, 4);
  const date = `${dateKeeper[1]} ${dateKeeper[0]} ${dateKeeper[2]}`;

  //dayIndex matches the string in the days array
  dayDisplay.innerHTML = days[dayIndex];
  dateDisplay.innerHTML = date;
}

//shows the time
function clock() {
  const hoursDisplay = document.querySelector("#hours");
  const minutesDisplay = document.querySelector("#minutes");
  const secondsDisplay = document.querySelector("#seconds");

  now = new Date();
  hours = now.getHours();
  mins = now.getMinutes();
  secs = now.getSeconds();

  if (hours < 10) {
    hoursDisplay.innerHTML = "0" + hours;
  } else {
    hoursDisplay.innerHTML = hours;
  }

  if (mins < 10) {
    minutesDisplay.innerHTML = "0" + mins;
  } else {
    minutesDisplay.innerHTML = mins;
  }

  if (secs < 10) {
    secondsDisplay.innerHTML = "0" + secs;
  } else {
    secondsDisplay.innerHTML = secs;
  }
  showDate();
}

clock();
setInterval(clock, 1000);
openBtn.addEventListener("click", openAlarmSettings);
addAlarmBtn.addEventListener("click", addAlarm);
setInterval(runAlarm, 1000);
// AlarmBtn.addEventListener("click", deleteAlarmBtn);

// setInterval(theDate, 1000 * 60 * 60 * 24);

setInterval(() => {
  const deleteAlarmBtns = document.querySelectorAll(".delete-alarm-btn");
  deleteAlarmBtns.forEach((btn) => {
    btn.addEventListener("click", deleteAlarm);
  });
});

function deleteAlarm() {
  console.log(this.parentElement.remove());
}
