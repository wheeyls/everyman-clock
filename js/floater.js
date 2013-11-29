define(['jquery'], function ($) {
  var $floater = $('#floater')
    , $start = $floater.find('.start')
    , $end = $floater.find('.end')
    , start = '00:00'
    , end = '00:00'
    , showing = false
    ;

  function render() {
    $start.html(start);
    $end.html(end);
    $floater.toggle(showing);
  }

  function position(ev) {
    if (showing) {
      $floater.css({ top: ev.clientY + 20, left: ev.clientX + 10 });
    }
  }

  $(document).on('floater:in', function (ev, startTime, endTime) {
    start = startTime;
    end = endTime;
    showing = true;
    render();
  }).on('floater:out', function () { showing = false; render(); });

  render();

  $(window).on('mousemove', position);
});
