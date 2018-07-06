"use strict";
(function() {

  var expect = require('chai').expect;
  var dueDateCalculatorService = require('../services/dueDateCalculatorService');
  var globals = require('../services/globals');

  var EXCEPTIONS = globals.Globals.EXCEPTIONS;

  var WORKDAYS = {
    tuesday: '2018-07-03T10:00',
    tuesdayAfternoon: '2018-07-03T16:30',
    tuesdayVeryEndDay: '2018-07-03T17:00',
    friday: '2018-07-06T10:00',
    fridayAfternoon: '2018-07-06T16:30',
    fridayVeryEndDay: '2018-07-06T17:00'
  };

  var RESULT = {
    currentDay: '2018-07-03T12:00',
    tomorrow: '2018-07-04T12:00',
    threeDays: '2018-07-06T12:00',
    tuesdayVeryEndDay: '2018-07-04T10:00',
    weekend: '2018-07-09T12:00',
    endWeek: '2018-07-09T09:30',
    twoWeekends: '2018-07-16T12:00',
    endTwoWeekends: '2018-07-16T09:30',
    endDay: '2018-07-04T09:30',
    notEnoughDays: '2018-07-09T09:30',
    justInTime: '2018-07-04T09:00',
    nextYear: '2019-07-02T10:00'
  };

  var TURNAROUNDS = {
    zero: 0,
    negative: -3,
    currentDay: 2,
    tomorrow: 10,
    threeDays: 26,
    weekend: 34,
    endTwoWeekends: 41,
    twoWeekends: 74,
    endDay: 1,
    notEnoughDays: 25,
    justInTime: 7,
    nextYear: 2080
  };

  describe.only('Due Date Calculator', function(){
    describe('Duration',function(){
      it('is zero long', function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.tuesday, TURNAROUNDS.zero)).to.been.equal(WORKDAYS.tuesday);
      });

      it('is negative value long', function(){
        expect(dueDateCalculatorService.CalculateDueDate.bind(dueDateCalculatorService.CalculateDueDate, WORKDAYS.tuesday, TURNAROUNDS.negative))
        .to.throw(EXCEPTIONS.negativeTurnaround);
      });

      it('is only on the current business day', function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.tuesday, TURNAROUNDS.currentDay)).to.been.equal(RESULT.currentDay);
      });

      it('contains work-off hours, next day', function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.tuesday, TURNAROUNDS.tomorrow)).to.been.equal(RESULT.tomorrow);
      });

      it('contains 3 work days',function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.tuesday, TURNAROUNDS.threeDays)).to.been.equal(RESULT.threeDays);
      });

      it('starts just on the very end of the day',function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.tuesdayVeryEndDay, TURNAROUNDS.endDay)).to.been.equal(RESULT.tuesdayVeryEndDay);
      });

      it('contains a weekend',function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.tuesday, TURNAROUNDS.weekend)).to.been.equal(RESULT.weekend);
      });

      it('just ends on next week',function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.fridayAfternoon, TURNAROUNDS.endDay)).to.been.equal(RESULT.endWeek);
      });

      it('contains multiple weekends',function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.tuesday, TURNAROUNDS.twoWeekends)).to.been.equal(RESULT.twoWeekends);
      });

      it('just ends on tomorrow',function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.tuesdayAfternoon, TURNAROUNDS.endDay)).to.been.equal(RESULT.endDay);
      });

      it('just ends on next week becasue not enough work days on the week',function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.tuesdayAfternoon, TURNAROUNDS.notEnoughDays)).to.been.equal(RESULT.notEnoughDays);
      });

      it('just ends on week after next week, contains 2 weekends',function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.fridayAfternoon, TURNAROUNDS.endTwoWeekends)).to.been.equal(RESULT.notEnoughDays);
      });

      it('finsihes in the end of the workday', function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.tuesday, TURNAROUNDS.justInTime)).to.been.equal(RESULT.justInTime);
      });

      it('finishes in the next year in the same time exactly', function(){
        expect(dueDateCalculatorService.CalculateDueDate(WORKDAYS.tuesday, TURNAROUNDS.nextYear)).to.been.equal(RESULT.nextYear);
      });
    });
  });
})();