"use strict";
(function() {

  var globals = {
    WORKHOURS: {
      start: {hours: 9, minutes: 0},
      end: {hours: 17, minutes: 0}
    },
    EXCEPTIONS: {
      negativeTurnaround: 'Negative turnaround is not valid',
      outWorkdays: 'Error detected. Ticket submit was out of workdays',
      outWorkhours: 'Error detected. Ticket submit was out of workhours',
      startAfterEnd: 'Error detected. Work hours start must be prior to the end time.'
    }
  }


  exports.Globals = globals;

})();