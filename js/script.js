requirejs.config({
  shim: {
    d3: { exports: 'd3' }
  }
});

require(['clock', 'arcs', 'floater'], function (clock, arcs) {
  var current = clock([
      ['22:00', '25:30']
    , ['5:10', '5:30']
    , ['9:10', '9:30']
    , ['15:40', '16:00']
    ])
    ;

  arcs(current);
  window.current = current;
});
