define(['jquery', 'd3'], function ($, d3) {
  var w = 500
    , h = 500
    , r = Math.min(w, h)
    ;

  function render(clock) {
    var svg = d3.select('#clock').append('svg')
                .attr('width', w).attr('height', h)
      , g
      ;

    function update(data) {
      g = svg.selectAll('path').data(data)
          .attr('d', function (d) {
            return d.arc(w * .45)(d);
          })
         ;

      g.enter()
        .append('g')
        .append('path')
        .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
        .style('fill', function (d, i) {
          if (i === 0) {
            return 'gray';
          } else if (d.live === true || d.name === 'hk') {
            return 'red';
          } else {
            return 'lightblue';
          }
        })
        .attr('d', function (d) { return d.arc(w * .45)(d) })
        .on('mouseover', function (d, i) {
          i > 0 && $(document).trigger('floater:in', [d.start.toString(), d.end.toString(), d.name]);
        })
        .on('mouseout', function (d, i) {
          i > 0 && $(document).trigger('floater:out', [d.start.toString(), d.end.toString(), d.name]);
        })
        ;
    }

    update(clock.periods);

    $(clock).on('change', function () {
      update(clock.periods);
    });
  }

  return render;
});
