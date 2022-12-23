function register() {
  let waitingTime = setInterval(function () {
    if (true) {
      window.location.href = "e-voting-registrationPage.html";
      // clearInterval(waitingTime);
    } else {
    }
  }, 1000);
}

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
      id: Math.floor(Math.random() * 10000000000),
      key: Math.floor(Math.random() * 1000000),
    };
    votersDetails.push(voters);
    localStorage.setItem("localVoters", JSON.stringify(votersDetails));
    showPass();
  }
}

function voteNow() {
  window.location.href = "e-voting-loginPage.html";
}

function rules() {
  rulesModal.style.display = "block";
}

function showPass() {
  showPassContainer.style.display = "flex";
  for (let index = 0; index < votersDetails.length; index++) {
    idn.innerHTML = "";
    keyNumber.innerHTML = "";
    welcomeName.innerHTML = "";
    welcomeName.innerHTML = `Welcome <br> ${votersDetails[index].fname} ${votersDetails[index].lname} <br>  please save your login details as`;
    idn.innerHTML += `ID: ADEX${votersDetails[index].id}`;
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

  if (found == true) {
    window.location.href = "e-voting-votingPage.html";
  } else {
  alert("Incorrect details, Kindly please check what you enter and re-type");
}



 /* if (found == true && allElectionResult.includes('myEmail')) {
    alert("yhea");
  } else if (found == true && (!allElectionResult.includes('myEmail'))) {
    alert("No way")
  }*/
    
}

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

function myChoice(para) {
  var myElectionResult = {
    myElectionChoice: para,
  };
  electionResult.splice(0, 1, myElectionResult);
  localStorage.setItem("localResults", JSON.stringify(electionResult));
  fingers.style.backgroundColor = "red";
}


function dispMyChoice() {
  myVoteResult = ""
  for (let index = 0; index <  electionResult.length; index++) {
    // electionResult = JSON.parse(localStorage.getItem("localResults"));
    sweetAlert.style.display = "flex";
  sweetAlert.innerHTML = `
  <div class="w-100 bg-light h-75 m-auto d-flex flex-column p-5 sweet-alert-modal-content">
        <div class=" sweet-alert d-flex justify-content-center"><i class="fas fa-check m-auto"></i></div>
        <div class="w-100">
          <h3 class="sweet-alert-h3 fs-1 text-center"><p>Thank you for voting</p>  <strong id="mySelf">${votersDetails[index].fname} ${votersDetails[index].lname}</strong> <p>voting successful, kindly please remember to print or screenshot your Volting result.</p></h3>
        </div>
        <div class="m-5 text-center fs-1 fw-bold text-uppercase" id="myVoltResult">${electionResult[index].myElectionChoice}</div>
        <footer class="w-100">
          <button class="btn btn-success okay-btn" onclick="closeSweetAlert()"> Okay</button>
        </footer>
      </div>
  `
  }
}





var allElectionResult = [];
if (localStorage.localResultsAll) {
  var oldAllResult = JSON.parse(localStorage.getItem("localResultsAll"));
  allElectionResult = oldAllResult;
}

function finish() {
  for (let index = 0; index <  votersDetails.length; index++) {
    disp.innerHTML = `${votersDetails[index].fname}`
    disp3.innerHTML = `${votersDetails[index].state}`
    disp4.innerHTML = `${votersDetails[index].email}`
    disp5.innerHTML = `${electionResult[index].myElectionChoice}`
  } 
    var allVotersElectionResult = {
  name: disp.innerHTML, 
  myState: disp3.innerHTML,
  myEmail: disp4.innerHTML, 
  myLatestChoice: disp5.innerHTML,
    } 

allElectionResult.push(allVotersElectionResult);
localStorage.setItem("localResultsAll", JSON.stringify(allElectionResult) );
window.location.href = "final.html";
}


