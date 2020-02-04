/* planner.js
 *
 * Here's where the magic happens for the day-planner. Contains methods for populating the list from local storage and changing it based on user input.
 */

// local variable declaration space
var currentHour;
var appointments = [];

// function declaration space

function checkHour() {
  /* arguments: none
   * returns: int
   * purpose: Figure out which 1-hour block counts as the present
   */
  return parseInt(moment().format("H"));
}

function readStorage() {
  /* arguments:
   * returns: array
   * purpose: Pull data from local storage and return as an array
   */
  // console.log("readStorage() called");
  return JSON.parse(localStorage.getItem("hw05-scheduler-appointments"));
}

function writeStorage() {
  /* arguments:
   * returns:
   * purpose: Write the contents of the appointments array to local storage
   */
  // console.log("writeStorage() called");
  localStorage.setItem("hw05-scheduler-appointments", JSON.stringify(appointments));
}

function whenIsThis(hourSlot) {
  /* arguments: int
   * returns: string
   * purpose: Determines what the current hour is, and returns whether the hour slot is in the past, present, or future
   */
  currentHour = checkHour();
  if (hourSlot < currentHour) return "past";
  if (hourSlot === currentHour) return "present";
  if (hourSlot > currentHour) return "future";
}

function init() {
  // grab the current date using moment.js
  $("#currentDay").text(moment().format("dddd, YYYY MMM. DD"));
  var storedAppts = readStorage();
  if (storedAppts != null) appointments = storedAppts;
  writeStorage();
  for (var i = 0; i < 9; i++) {
    // color according to timeframe 
    var currentSlot = whenIsThis(i+9);
    if (currentSlot === "past") {
      $("#" + i + "h").addClass("pastHour");
      $("#" + i).addClass("pastHour");
    } else if (currentSlot === "present") {
      $("#" + i + "h").addClass("presentHour");
      $("#" + i).addClass("presentHour");
    } else {
      $("#" + i + "h").addClass("futureHour");
      $("#" + i).addClass("futureHour");
    }
    $("#" + i).val(appointments[i]);
  }
}

// startup and event handlers
init();

$(".fa-save").on("click", function(e) {
  /* target: whichever of the save buttons got clicked
   * purpose: grab the contents of the associated textarea and store them in the proper slot in the appointments[] array.
   */
  e.preventDefault();
  var hourSlot = $(this)
    .parent()
    .parent()
    .attr("data-hour-slot");
  appointments[hourSlot] = $("#" + hourSlot).val();
  writeStorage();
});
