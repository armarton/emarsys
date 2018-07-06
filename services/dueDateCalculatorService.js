"use strict";
(function() {
  var EXCEPTIONS = require('./globals').Globals.EXCEPTIONS;
  var checkTicketValidity = require('./ticketHandlerService').CheckTicketValidity;

  function calculateDueDate(submitDateString, turnaround) {
    var submitDate = new Date(submitDateString);

    if(checkTicketValidity(submitDateString)) {
      if(turnaround > 0) {
        return calculateResult(submitDate, turnaround);
      }
      else if (turnaround === 0) {
        return submitDateString;
      }
      else {
        throw new Error(EXCEPTIONS.negativeTurnaround);
      }
    }
  }

  function checkTurnaroundValidity(turnaround) {

  }
  
  function calculateResult(submitDate, turnaround) {

  }

  function getWorkHours(turnaround) {
    return turnaround % 40 % 8;
  }

  function isClosedOnCurrentDay() {

  }
  exports.CalculateDueDate = calculateDueDate;

})();