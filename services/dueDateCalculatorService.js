"use strict";
(function() {
  var EXCEPTIONS = require('./globals').Globals.EXCEPTIONS;
  var WORKHOURS = require('./globals').Globals.WORKHOURS;
  var checkTicketValidity = require('./ticketHandlerService').CheckTicketValidity;

  var today = new Date();
  var startTime = new Date(today.getFullYear, today.getMonth(), today.getDate, WORKHOURS.start.hours, WORKHOURS.start.minutes);
  var endTime = new Date(today.getFullYear, today.getMonth(), today.getDate, WORKHOURS.end.hours, WORKHOURS.end.minutes);
  
  Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
  }

  Date.prototype.addHours = function(hours) {
    this.setTime(this.getTime() + (hours * 60 * 60 * 1000));
    return this;
  }

  Date.prototype.addMinutes = function(minutes) {
    this.setTime(this.getTime() + (minutes * 60 * 1000));
    return this;
  }

  Date.prototype.addWeeks = function(weeks) {
    this.setDate(this.getDate() + weeks * 7);
  }

  Date.prototype.toYYYYMMDDTHHMMString = function() {
    var resultString = "";

    resultString += this.getFullYear() + "-";

    if(this.getMonth() + 1 < 10) {
      resultString += 0;
    }
    resultString += this.getMonth() + 1 + "-";

    if(this.getDate() < 10) {
      resultString += 0;
    }
    resultString += this.getDate() + "T";

    if(this.getHours() < 10) {
      resultString += 0;
    }
    resultString += this.getHours() + ":";

    if(this.getMinutes() < 10) {
      resultString += 0;
    }
    resultString += this.getMinutes();
    return resultString;
  }

  Date.prototype.isBefore = function(hours, minutes) {
    if(this.getHours() > hours || this.getHours() === hours && this.getMinutes() > minutes) {
      return false;
    }
    else {
      return true;
    }
  }

  function calculateDueDate(submitDateString, turnaround) {
    var submitDate = new Date(submitDateString);

    if(checkTicketValidity(submitDateString)) {
      if(turnaround > 0) {
        return calculateResultDate(submitDate, turnaround);
      }
      else if (turnaround === 0) {
        return submitDateString;
      }
      else {
        throw new Error(EXCEPTIONS.negativeTurnaround);
      }
    }
  }

  function calculateResultDate(submitDate, turnaround) {
    var resultDate = new Date(submitDate);
    var result = "";
    debugger;

    resultDate = addHours(resultDate, getWorkHours(turnaround));
    resultDate = addDays(resultDate, getWorkDays(turnaround));
    resultDate = addWeeks(resultDate, getWorkWeeks(turnaround));

    return resultDate.toYYYYMMDDTHHMMString();
  }

  function addHours(date, hours) {
    var tempDate = new Date(date);

    if(isStayingThisDay(tempDate, hours)) {
      tempDate.addHours(hours);
      return tempDate;
    }
    else {
      return movesNextWorkday(tempDate, hours)
    }
  }

  function addDays(date, days) {
    var tempDate = new Date(date);

    if(!isEnoughWorkDays(tempDate, days)) {
      tempDate = jumpWeekend(date);
    }
    tempDate.addDays(days);
    return tempDate;
  }

  function addWeeks(date, weeks) {
    var tempDate = new Date(date);

    tempDate.addWeeks(weeks);
    return tempDate;
  }

  function isEnoughWorkDays(date, days) {
    return 5 - date.getDay() >= days;
  }
  
  function isMovedToWeekend(date) {
    return date.getDay() === 6;
  }

  function isStayingThisDay(date, hours) {
    var tempDate = new Date(date);
    tempDate.addHours(hours);
    return tempDate.isBefore(WORKHOURS.end.hours, WORKHOURS.end.minutes);
  }

  function jumpWeekend(date) {
    var tempDate = new Date(date);
    tempDate.addDays(2);
    return tempDate;
  }

  function movesNextDay(date, hours) {
    var tempDate = new Date(date);
    tempDate.addHours(24 + hours - WORKHOURS.end.hours + WORKHOURS.start.hours)
    return tempDate;
  }

  function movesNextWorkday(date, hours) {
    var tempDate = movesNextDay(date, hours);

    if(isMovedToWeekend(date)) {
      tempDate = jumpWeekend(date);
    }

    return tempDate;
  }

  function getWorkDays(turnaround) {
    return Math.floor(turnaround % 40 / 8);
  }

  function getWorkHours(turnaround) {
    return turnaround % 40 % 8;
  }

  function getWorkWeeks(turnaround) {
    return Math.floor(turnaround / 40);
  }

  exports.CalculateDueDate = calculateDueDate;
})();