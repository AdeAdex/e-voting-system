function register() {
  let waitingTime = setInterval(function () {
    if (true) {
      window.location.href = "e-voting-registrationPage.html";
      // clearInterval(waitingTime);
    } else {
    }
  }, 1000);
  loadNIN();
}

function showTotal() {
  showTotalReg.innerHTML = `${votersDetails.length} `;
  // totalParty.innerHTML = `${}`
}

var allNIN = [];
if (localStorage.localNIN) {
  var oldNIN = JSON.parse(localStorage.getItem("localNIN"));
  allNIN = oldNIN;
}
function loadNIN() {
  // if (nin.value == "") {
  //   nin.style.borderColor = "red";
  // } else {
  var votersNIN = {
    aAlphabet: 12345678910,
    bAlphabet: 12345678911,
    cAlphabet: 12345678912,
    dAlphabet: 12345678913,
    eAlphabet: 12345678914,
    fAlphabet: 12345678915,
  };
  allNIN.splice(0, 1, votersNIN);
  localStorage.setItem("localNIN", JSON.stringify(allNIN));
  // }
}

// function lookup() {
//   for (let index = 0; index < allNIN.length; index++) {
//     if (allNIN[index].aAlphabet == nin.value) {
//       found = true;
//       ninFeedback.innerHTML =  "NIN matched"
//       break;
//     } else {
//       ninFeedback.style.display = "block"
//       ninFeedback.innerHTML =  "NIN doesn't match"
//     }
//   }
// }

/*function TDate() {
    var selectedDate = dateOfBirth.value;
    var ToDate = new Date();
    if (selectedDate < Date.now()) {
        alert("The Date must be Bigger or Equal to today date")
        return false;
    }
    return true;
} */

// function getAge() {
//     var enteredValue = $get('<%=ui_txtDOB.ClientID %>');;
// var enteredAge = getAge(enteredValue.value);
// if( enteredAge < 18 ) {
//     alert("DOB not valid");
//     enteredValue.focus();
//     return false;
// }
// }

// function TDate() {
//     var UserDate = dateOfBirth.value;
//     var ToDate = new Date();
//     if (new Date(UserDate).getTime() <= ToDate.getTime()) {
//           alert("The Date must be Bigger or Equal to today date");
//           return false;
//      }
//     return true;
// }

var votersDetails = [];
if (localStorage.localVoters) {
  var oldVoters = JSON.parse(localStorage.getItem("localVoters"));
  votersDetails = oldVoters;
}

function submitRegistration() {
  if (firstName.value == "") {
    firstName.style.borderColor = "red";
  } else {
    var voters = {
      //passport : photo.value,
      fname: firstName.value,
      lname: lastName.value,
      nin: nin.value,
      country: countryOption.value,
      state: stateOption.value,
      email: email.value,
      phonenumber: phoneNumber.value,
      dateofbirth: dateOfBirth.value,
      gender: genderOption.value,
      password: pass.value,
      check: invalidCheck.value,
      id: `ADEX-${Math.floor(Math.random() * 10000000000)}`,
      key: Math.floor(Math.random() * 1000000),
    };
    votersDetails.push(voters);
    localStorage.setItem("localVoters", JSON.stringify(votersDetails));
    showPass();
    showTotal();
  }
}

function voteNow() {
  window.location.href = "e-voting-loginPage.html";
}

function rules() {
  rulesModal.style.display = "flex";
}

function showPass() {
  showPassContainer.style.display = "flex";
  for (let index = 0; index < votersDetails.length; index++) {
    idn.innerHTML = "";
    keyNumber.innerHTML = "";
    welcomeName.innerHTML = "";
    welcomeName.innerHTML = `Welcome <br> ${votersDetails[index].fname} ${votersDetails[index].lname} <br>  please save your login details as`;
    idn.innerHTML += `ID: ${votersDetails[index].id}`;
    keyNumber.innerHTML += `Key: ${votersDetails[index].key}`;
  }
  localStorage.setItem("localVoters", JSON.stringify(votersDetails));
}

function closeSaveNameModal() {
  rulesModal.style.display = "none";
}

function closeSweetAlert() {
  sweetAlert.style.display = "none";
}

function closeShowPass() {
  showPassContainer.style.display = "none";
}

function toLogin() {
  window.location.href = "e-voting-loginPage.html";
}

function signIn() {
  var votersId = loginId.value;
  var votersKey = pass.value;
  var found = false;
  for (let index = 0; index < votersDetails.length; index++) {
    if (
      (votersDetails[index].id || votersDetails[index].email == votersId) &&
      votersDetails[index].key == votersKey
    ) {
      found = true;
      break;
    }
  }

  // logic to check whether the User entered email is in allElectionResult array
  let foundInAllElectionResult = false;
  for (let user of allElectionResult) {
    if (user.myEmail === votersId) {
      foundInAllElectionResult = true;
      break;
    }
  }

  if (found == true && foundInAllElectionResult) {
    warningAlert.innerHTML = `<i class="fas fa-warning" id="faWarning"></i> Operation Declined. <p>You cant vote twice, you've already voted.</p>`;
  } else if (found == true && !foundInAllElectionResult) {
    window.location.href = "e-voting-votingPage.html";
  } else if (found == false && !foundInAllElectionResult) {
    alert("re-type");
  } else {
    alert("Incorrect details, Kindly please check what you enter and re-type");
  }
}

function fingerprint() {
  loading.innerHTML = `Fingerprint Scanner Reading Your finger`;
  let waitingTime = setInterval(function () {
    if (true) {
      window.location.href = "e-voting-votingPage.html";
    }
  }, 5000);
}

/*function signIn() {
  var votersId = loginId.value;
  var votersKey = pass.value;
  var found = false;
  for (let index = 0; index < votersDetails.length; index++) {
    if (
      (votersDetails[index].id || votersDetails[index].email == votersId) &&
      votersDetails[index].key == votersKey
    ) {
      found = true;
      break;
    }
  }

  if (found == true) {
    window.location.href = "e-voting-votingPage.html";
  } else {
  alert("Incorrect details, Kindly please check what you enter and re-type");
}

}*/

function lan() {
  if (formSelect.value == "yoruba") {
    reg.innerText = "forukosile";
    vote.innerText = "dibo";
    help.innerText = "iranlowo";
  } else if (formSelect.value == "igbo") {
    reg.innerText = "debanye aha";
    vote.innerText = "votu";
    help.innerText = "enyemaka";
  } else if (formSelect.value == "hausa") {
    reg.innerText = "yin rijista";
    vote.innerText = "zabe";
    help.innerText = "taimako";
  } else if (formSelect.value == "english") {
    reg.innerText = "register";
    vote.innerText = "vote";
    help.innerText = "help";
  }
}

var electionResult = [];
if (localStorage.localResults) {
  var oldResult = JSON.parse(localStorage.getItem("localResults"));
  electionResult = oldResult;
}

function myChoice(para, para2) {
  var myElectionResult = {
    myElectionChoice: para,
    myElectionChoiceName: para2,
    // myElectionChoiceImg: picture1,
  };
  electionResult.splice(0, 1, myElectionResult);
  localStorage.setItem("localResults", JSON.stringify(electionResult));
  fingers.style.backgroundColor = "red";
}
myVoteResult = "";
myVoltResultName = "";
mySelf = "";
function dispMyChoice() {
  let firstN;
  let lastN;
  for (let index = 0; index < votersDetails.length; index++) {
    firstN = `${votersDetails[index].fname}`;
    lastN = `${votersDetails[index].lname}`;
  }
  if (electionResult.length == 0) {
    alert("You've not made any choice, Please select a choice first");
  } else {
    for (let index = 0; index < electionResult.length; index++) {
      electionResult = JSON.parse(localStorage.getItem("localResults"));
      sweetAlert.style.display = "flex";
      sweetAlert.innerHTML = `
    <div class="w-100 bg-light h-75 m-auto d-flex flex-column sweet-alert-modal-content">
          <div class=" sweet-alert d-flex justify-content-center"><i class="fas fa-check m-auto"></i></div>
          <div class="w-100">
            <h3 class="sweet-alert-h3 text-center"><p>Thank you for voting</p>  <strong id="mySelf">${firstN} ${lastN}</strong> <p class="fs-3 mt-2">Voting successful, kindly please remember to print or screenshot your Volting result.</p></h3>
          </div>
          <div class="m-2 text-center fw-bold text-uppercase">
          <table class="table w-100 fs-6 ">
            <tr>
              <th>Name</th>
              <th>Party logo</th>
              <th>Party Name</th>
            </tr>
            <tr>
              <td id="myVoltResultName">${electionResult[index].myElectionChoiceName}</td>
              <td></td>
              <td id="myVoltResult" class="">${electionResult[index].myElectionChoice}</td>
            </tr>
          </table> 
          </div>
          <footer class="w-100">
            <button class="btn btn-success okay-btn" onclick="closeSweetAlert()"> Okay</button>
            <button class="btn btn-primary fs-4 print-btn" onclick="window.print();">Print</button>
          </footer>
        </div>
    `;
    }
  }
}

var allElectionResult = [];
if (localStorage.localResultsAll) {
  var oldAllResult = JSON.parse(localStorage.getItem("localResultsAll"));
  allElectionResult = oldAllResult;
}

function finish() {
  let yes = confirm(
    `Are you sure you want to finish voting? \nNote that once you click 'OK' button, you cant make any choice again and you can't vote again. Please feel free to make your choice before clicking 'OK' button  \nYou can click 'Cancel' button here and click 'My choice' button to view your vote choice \nThanks`
  );
  if (yes) {
    for (let index = 0; index < votersDetails.length; index++) {
      disp.innerHTML = `${votersDetails[index].fname}`;
      disp3.innerHTML = `${votersDetails[index].state}`;
      disp4.innerHTML = `${votersDetails[index].email}`;
    }
    for (let index = 0; index < electionResult.length; index++) {
      disp5.innerHTML = `${electionResult[index].myElectionChoice}`;
    }
    var allVotersElectionResult = {
      name: disp.innerHTML,
      myState: disp3.innerHTML,
      myEmail: disp4.innerHTML,
      myLatestChoice: disp5.innerHTML,
    };
    electionResult.splice(0);
    localStorage.setItem("localResults", JSON.stringify(electionResult));

    allElectionResult.push(allVotersElectionResult);
    localStorage.setItem("localResultsAll", JSON.stringify(allElectionResult));
    window.location.href = "e-voting-homePage.html";
  } else {
  }
}

var inecChairman = [];
if (localStorage.InecChairmanDetails) {
  var oldInecChairman = JSON.parse(localStorage.getItem("InecChairmanDetails"));
  inecChairman = oldInecChairman;
}

function chairmanReg() {
  if (firstName.value == "") {
    firstName.style.borderColor = "red";
  } else {
    var inecBoss = {
      chairmanFName: firstName.value,
      chairmanLName: lastName.value,
      chairmanEmail: email.value,
      chairmanPas: pass.value,
    };
    inecChairman.push(inecBoss);
    localStorage.setItem("InecChairmanDetails", JSON.stringify(inecChairman));
  }
}

function chairmanLogin() {
  var cEmail = email.value;
  var cPass = pass.value;
  var found = false;
  for (let index = 0; index < inecChairman.length; index++) {
    if (
      inecChairman[index].chairmanEmail == cEmail &&
      inecChairman[index].chairmanPas == cPass
    ) {
      found = true;
      break;
    }
  }

  if (found == true) {
    window.location.href = "final.html";
  } else {
    alert("Incorrect details, Kindly please check what you enter and re-type");
  }
}

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
