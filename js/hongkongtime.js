define([], function () {
  return function (t, plusMin) {
    plusMin = plusMin ? plusMin * 60 * 1000 : 0;
    return new Date(t.getTime() + (14 * 60 * 60 * 1000) + plusMin);
  };
});
