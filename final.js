allElectionResult = JSON.parse(localStorage.getItem("localResultsAll"));
function enjoy() {
  // dispre.innerHTML = "";
  for (let index = 0; index < allElectionResult.length; index++) {
    table.innerHTML += `
    <tbody class="">
    <tr>
         <th scope="row">${index + 1}</th>
         <td> ${allElectionResult[index].name}</td>
         <td> ${allElectionResult[index].myState}</td>
         <td> ${allElectionResult[index].myEmail}</td>
         <td class="text-uppercase text-bold"> ${
           allElectionResult[index].myLatestChoice
         }</td>
        </tr>
    </tbody>
        
        
    `;
  }
}
