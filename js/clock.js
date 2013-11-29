define(['d3', 'period', 'jquery'], function (d3, period, $) {
  'use strict';

  function clock(times) {
    var periods = []
      , me
      , now = period(new Date(), new Date(), { live: true })
      , base = period('0:00', '24:00')
      , i, ii
      ;

    me = {
      addPeriod: function (start, end) {
        var p = period(start, end);
        periods.push(p);

        $(p).on('change', me.onChange);
        me.onChange();
      }

    , get periods() {
        return [base].concat(periods).concat(me.now);
      }

    , get now() {
        return now;
      }

    , translate: function (d) {
        periods.forEach(function (v) { v.translate(d); });
      }

    , onChange: function () {
        $(me).trigger('change');
      }
    };

    for (i = 0, ii = times.length; i < ii; i++) {
      me.addPeriod(times[i][0], times[i][1]);
    }

    $(now).on('change', me.onChange);

    return me;
  }

  return clock;
});
