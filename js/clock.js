define(['d3', 'period', 'jquery', 'hongkongtime'], function (d3, period, $, hkt) {
  'use strict';

  function clock(times) {
    var periods = []
      , me
      , now = period(new Date(), new Date(), { name: 'now', live: true })
      , base = period('0:00', '24:00')
      , i, ii
      ;

    me = {
      addPeriod: function (start, end, opts) {
        var p = period(start, end, opts);
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
      me.addPeriod(times[i][0], times[i][1], { name: 'sleep' });
    }

    me.addPeriod(hkt(new Date()), hkt(new Date(), 3), { name: 'hk' });

    $(now).on('change', me.onChange);

    return me;
  }

  return clock;
});
