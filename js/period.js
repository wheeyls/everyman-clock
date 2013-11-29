define(['point', 'jquery'], function (point, $) {
  function period(startTime, endTime, opts) {
    var me
      , start = point(startTime)
      , end = point(endTime)
      , options = $.extend({ live: false }, opts)
      ;

    function updateTimer() {
      if (options.live) {
        me.updateLiveDate();
        window.setTimeout(updateTimer, 10000);
      }
    }

    me = {
      updateLiveDate: function () {
        start.time = new Date();
        end.time = new Date();
      }

    , set live(val) {
        options.live = val;

        updateTimer();
      }

    , get start() {
        return start;
      }

    , get end() {
        return end;
      }

    , get live() {
        return options.live;
      }

    , get startAngle() {
        return start.angle;
      }

    , get endAngle() {
        return me.live ? me.startAngle + 0.01 : end.angle;
      }

    , translate: function (distance) {
        start.translate(distance);
        end.translate(distance);
      }

    , arc: function (r) {
        r = r || 100;
        return arc = d3.svg.arc()
                  .startAngle(me.startAngle)
                  .endAngle(me.endAngle)
                  .innerRadius(r - 50)
                  .outerRadius(r);
      }

    , onChange: function () {
        $(me).trigger('change');
      }
    };

    $(start).on('change', me.onChange);
    $(end).on('change', me.onChange);
    updateTimer();

    return me;
  }

  return period;
});
