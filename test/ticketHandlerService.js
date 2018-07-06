"use strict";
(function() {

  var expect = require('chai').expect;
  var ticketHandlerService = require('../services/ticketHandlerService');
  var globals = require('../services/globals');

  var EXCEPTIONS = globals.Globals.EXCEPTIONS;

  var WORKDAY = {
    offhour: '2018-07-06T20:00',
    offday: '2018-07-07T11:00',
    workhour: '2018-07-06T10:00'
  };

  describe('Ticket handler', function(){
    it('Drops ticket out of working hours on a work day, gives exception', function(){
      debugger;
      expect(ticketHandlerService.CheckTicketValidity.bind(ticketHandlerService.CheckTicketValidity, WORKDAY.offhour))
      .to.throw(EXCEPTIONS.outWorkhours);
    });

    it('Drops ticket on a work-off day, gives exception', function(){
      expect(ticketHandlerService.CheckTicketValidity.bind(ticketHandlerService.CheckTicketValidity, WORKDAY.offday))
      .to.throw(EXCEPTIONS.outWorkdays);
    });

    it('Accepts ticket in working hours', function(){
      expect(ticketHandlerService.CheckTicketValidity(WORKDAY.workhour)).to.have.been.true;
    });
  });
})();