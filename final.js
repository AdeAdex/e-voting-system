allPresidentialElectionResult = JSON.parse(
  localStorage.getItem("presidentialResults")
);
function presidentialResult() {
  // dispre.innerHTML = "";
  for (let index = 0; index < allPresidentialElectionResult.length; index++) {
    presidentialTable.innerHTML += `
    <tbody class="table-body">
    <tr>
         <th scope="row">${index + 1}</th>
         <td> ${allPresidentialElectionResult[index].name}</td>
         <td> ${allPresidentialElectionResult[index].myState}</td>
         <td> ${allPresidentialElectionResult[index].myEmail}</td>
         <td class="text-uppercase text-bold" id="allChoice"> ${
           allPresidentialElectionResult[index].myLatestChoice
         }</td>
        </tr>
    </tbody>
        
        
    `;
  }
}

stateGovElection = JSON.parse(
  localStorage.getItem("myStateGovernorshipResult")
);
function governorResult() {
  // dispre.innerHTML = "";
  for (let index = 0; index < stateGovElection.length; index++) {
    table.innerHTML += `
    <tbody class="table-body">
    <tr>
         <th scope="row">${index + 1}</th>
         <td> ${stateGovElection[index].name}</td>
         <td> ${stateGovElection[index].myState}</td>
         <td> ${stateGovElection[index].myEmail}</td>
         <td class="text-uppercase text-bold" id="allChoice"> ${
           stateGovElection[index].myStateLatestChoice
         }</td>
        </tr>
    </tbody>
        
        
    `;
  }
}



function next() {
  window.location.href = "toFinal.html";
}










function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = presidentialTable;
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// function sortBy() {
//   for (let index = 0; index < allPresidentialElectionResult.length; index++) {
//     if (sorting.value == "state") {
//       allPresidentialElectionResult.sort()
//     } else if (sorting.value == "party") {
//       allPresidentialElectionResult.sort()
//     } else if (sorting.value == "lga") {
//       allPresidentialElectionResult.sort()
//     }
//   }

// }

function winner() {
  if (allPresidentialElectionResult.includes("pdp")) {
    alert("Yes");
  } else {
    alert("Noooo");
  }
}
