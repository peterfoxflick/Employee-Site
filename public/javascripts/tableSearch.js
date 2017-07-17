
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