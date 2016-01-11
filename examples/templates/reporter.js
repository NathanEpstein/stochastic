window.addEventListener('DOMContentLoaded', function() {
  scrubby.on('scrubbed', function(a, b, c) {
    console.log(a, b, c);
    document.getElementById('CTMCReport').innerHTML =
      JSON.stringify(CTMC).replace(/,/g, ',\n');
  });
  for (var i = 1; i < 10; i++) {
    var f = scrubby.makeScrubbingFrame('inline#' + i);
  }

  document.getElementById('CTMC').appendChild(f);
});
