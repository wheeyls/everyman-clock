define(['jquery'], function ($) {
  function point(time, opts) {
    var me
      , h = 0
      , m = 0
      ;

    me = {
      toString: function () {
        return h.toString() + ':' + ('0' + m.toString()).slice(-2);
      }

    , toMinutes: function () {
        return (h * 60) + m;
      }

    , fromString: function (str) {
        me.hour = parseInt(str.match(/(\d+):\d+/)[1]);
        me.min = parseInt(str.match(/\d+:(\d+)/)[1]);
        me.onChange();
      }

    , fromDate: function (date) {
        me.hour = date.getHours();
        me.min = date.getMinutes()
        me.onChange();
      }

    , get angle() {
        var ratio = me.toMinutes() / (24 * 60)
          ;

        return ratio * 2 * Math.PI;
      }

    , translate: function (d) {
        var t = me.time.getTime()
          , minutesInMs = d * 1000 * 60
          ;

        me.time = new Date(t + minutesInMs);
      }

    , get time() {
        var d = new Date();
        d.setMinutes(m);
        d.setHours(h);
        d.setSeconds(0);
        return d;
      }

    , set time(t) {
        typeof t === 'string' ? me.fromString(t) : me.fromDate(t);
      }

    , set hour(hour) {
        h = hour;
        me.onChange();
      }

    , set min(min) {
        m = min;
        me.onChange();
      }

    , onChange: function () {
        $(me).trigger('change');
      }
    };

    time && (me.time = time);
    return me;
  }

  return point;
});
