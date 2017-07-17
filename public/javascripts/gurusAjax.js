function upAppList(cat) {
  $.get('/api/getApps', {
    cat: cat
  }, function(data, status) {
    console.log(data);
  })
}