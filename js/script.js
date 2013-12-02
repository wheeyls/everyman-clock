requirejs.config({
  shim: {
    d3: { exports: 'd3' }
  }
});

require(['clock', 'arcs', 'floater'], function (clock, arcs) {
  /* arcs(clock([
      ['22:00', '25:30']
    , ['5:10', '5:30']
    , ['9:10', '9:30']
    , ['15:40', '16:00']
    ])); */

  arcs(clock([
      ['22:00', '25:30']
    , ['5:00', '6:30']
    , ['14:30', '15:00']
  ]));
});
