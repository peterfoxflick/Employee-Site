
/**
 * a function that filters a table based on a given input
 *
 * @param inp -> the item being searched for
 * @param tab -> the table being filtered
 */
function tableSearch(inp, tab) {
  var input, filter, table, tr, td, i;
  input = document.getElementById(inp);
  filter = input.value.toUpperCase();
  table = document.getElementById(tab);
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

/**
 * Same idea as the table search, but it searches Cards.
 * @param inp
 * @param cards
 */
function cardSearch(inp, cards) {
  var input, filter, ul, li, h, i, span, j;
  input = document.getElementById(inp);
  filter = input.value.toUpperCase();
  ul = document.getElementById(cards);
  li = ul.getElementsByTagName('li');


  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    span = li[i].getElementsByTagName('span');
    for( j = 0; j < span.length; j++) {
      h = span[j].getElementsByTagName('h4')[0];
      if(h){
        if (h.innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].className = "animated slideInUp";
          li[i].style.display = "";
        } else {
          li[i].className = "animated fadeOut";
          li[i].style.display = "none";
        }
      }
    }
  }
}