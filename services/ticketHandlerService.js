"use strict";
(function() {

  var _ = require('lodash');
  var WORKHOURS = require('./globals').Globals.WORKHOURS;
  var EXCEPTIONS = require('./globals').Globals.EXCEPTIONS;

  var WORKDAYS = [1, 2, 3, 4, 5];

  function checkWORKHOURSValidity() {
    if(!compareTimes(WORKHOURS.start, WORKHOURS.end)) {
      throw new Error(EXCEPTIONS.startAfterEnd);
    }
  }

  function checkTicketValidity(submitDateString) {
    var submitDate = new Date(submitDateString);

    debugger;
    if(!_.includes(WORKDAYS, submitDate.getDay())) {
      throw new Error(EXCEPTIONS.outWorkdays);
    }
    else if(
      submitDate.getHours() + 1 < WORKHOURS.start.hours ||
      submitDate.getHours() + 1 > WORKHOURS.end.hours ||
      (submitDate.getHours() + 1 === WORKHOURS.start.hours && submitDate.getMinutes() < WORKHOURS.start.minutes) ||
      (submitDate.getHours() + 1 === WORKHOURS.end.hours && submitDate.getMinutes() > WORKHOURS.end.minutes)
    ) {
      throw new Error(EXCEPTIONS.outWorkhours);
    }
    else {
      return true;
    }
  }

  function compareTimes(time1, time2) {
    return time1.hours === time2.hours ?
      time1.minutes > time2.minutes :
      time1.hours > time2.hours;
  }



  exports.CheckTicketValidity = checkTicketValidity;

})();