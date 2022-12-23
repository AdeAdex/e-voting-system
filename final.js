allElectionResult = JSON.parse(localStorage.getItem("localResultsAll"));
function enjoy() {
  dispre.innerHTML = "";
  for (let index = 0; index < allElectionResult.length; index++) {
    dispre.innerHTML += `
    <table>
    <tr>
     <td>${index + 1}</td>
     <td>${allElectionResult[index].name}</td>
     <td>${allElectionResult[index].myState}</td>
     <td>${allElectionResult[index].myEmail}</td>
     <td>${allElectionResult[index].myLatestChoice}</td>
    </tr>
    </table>
    ` 
  } 
} 