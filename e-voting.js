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
  totalPresidentialVolts.innerHTML = `${allPresidentialElectionResult.length}`;
  totalGovernorshipVolts.innerHTML = `${stateGovElection.length}`;
}

var allNIN = [];
if (localStorage.localNIN) {
  var oldNIN = JSON.parse(localStorage.getItem("localNIN"));
  allNIN = oldNIN;
}
function loadNIN() {
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
}

function lookup() {
  for (let index = 0; index < allNIN.length; index++) {
    if (allNIN[index].aAlphabet == nin.value) {
      found = true;
      ninFeedback.innerHTML = "NIN matched";
      nin.style.borderColor = "green";
      break;
    } else {
      ninFeedback.style.display = "block";
      ninFeedback.innerHTML = "NIN doesn't match";
      nin.style.borderColor = "red";
    }
  }
}

/*function getAge() {
    var UserDate = dateOfBirth.value;
    var ToDate = new Date();
    if (new Date(UserDate).getTime() <= ToDate.getTime()) {
          alert("The Date must be Bigger or Equal to today date");
          return false;
     }
    return true;
}*/

var votersDetails = [];
if (localStorage.registeredVotersPersonalDetails) {
  var oldVoters = JSON.parse(
    localStorage.getItem("registeredVotersPersonalDetails")
  );
  votersDetails = oldVoters;
}

function submitRegistration() {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var foundDetails = false;
  for (let x of votersDetails) {
    if (x.email == email.value || x.phonenumber == phoneNumber.value) {
      foundDetails = true;
      break;
    }
  }
  if (foundDetails == true) {
    alert(
      "The email or Phone number you supply has been associated with an account already"
    );
  } else if (
    firstName.value == "" ||
    lastName.value == "" ||
    countryOption.value == "" ||
    stateOption.value == "" ||
    email.value == "" ||
    phoneNumber.value == "" ||
    pass.value == ""
  ) {
    // firstName.style.borderColor = "red";
    alert("All field must be filled.");
  } else if (!email.value.match(validRegex)) {
    emailFeedback.style.display = "block";
    phoneNumberFeedback.style.display = "none";
    checkInvalidFeedback.style.display = "none";
  } else if (isNaN(phoneNumber.value)) {
    phoneNumberFeedback.style.display = "block";
    emailFeedback.style.display = "none";
    checkInvalidFeedback.style.display = "none";
  } else if (phoneNumber.value < 11) {
    phoneNumberFeedback.style.display = "block";
    emailFeedback.style.display = "none";
    checkInvalidFeedback.style.display = "none";
    phoneNumberFeedback.innerHTML =
      "Phone number must be at least 11 digit minimum and 14 digit maximum";
  } else if (!invalidCheck.checked) {
    checkInvalidFeedback.style.display = "block";
    phoneNumberFeedback.style.display = "none";
    emailFeedback.style.display = "none";
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
    localStorage.setItem(
      "registeredVotersPersonalDetails",
      JSON.stringify(votersDetails)
    );
    showPass();
    showTotal();
    validateEmail();
    checkInvalidFeedback.style.display = "none";
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
  localStorage.setItem(
    "registeredVotersPersonalDetails",
    JSON.stringify(votersDetails)
  );
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
  var foundInRegistry = false;
  for (let index = 0; index < votersDetails.length; index++) {
    if (
      (votersDetails[index].id == votersId ||
        votersDetails[index].email == votersId ||
        votersDetails[index].phonenumber == votersId) &&
      votersDetails[index].key == votersKey
    ) {
      found = true;
      break;
    } else if (
      votersDetails[index].id == votersId ||
      votersDetails[index].email == votersId ||
      votersDetails[index].phonenumber == votersId
    ) {
      foundInRegistry = true;
      break;
    }
  }

  // logic to check whether the User entered email is in allPresidentialElectionResult array
  let foundInAllPresidentialElectionResult = false;
  for (let user of allPresidentialElectionResult) {
    if (
      user.myEmail === votersId ||
      user.myId === votersId ||
      user.myPhoneNumber === votersId
    ) {
      foundInAllPresidentialElectionResult = true;
      break;
    }
  }

  if (found == true && foundInAllPresidentialElectionResult) {
    warningAlert.innerHTML = `<i class="fas fa-warning" id="faWarning"></i> Operation Declined. <p>You cant vote twice, you've already voted.</p>`;
  } else if (found == true && !foundInAllPresidentialElectionResult) {
    window.location.href = "e-voting-contestantPage.html";
    warningAlert.innerHTML = ``;
  } else if (foundInRegistry == false) {
    warningAlert.innerHTML = `<i class="fas fa-warning" id="faWarning"></i>Failed Operation. <p>It seems the voter id/email/phone number entered hasn't been register, kindly register and try again.</p>`;
  } else {
    warningAlert.innerHTML = `<i class="fas fa-warning" id="faWarning"></i>Failed Operation. <p>Incorrect details, Kindly please check what you enter and try again.</p>`;
  }
}



function toggleForgotPassword() {
  var forgotPasswordSection = document.getElementById("forgotPasswordSection");
  forgotPasswordSection.style.display = "block";
  setTimeout(function() {
    forgotPasswordSection.style.display = "none";
  }, 10000);
}


function retrievePassword() {
  var votersInput = forgotpassinput.value;
  var found = false;
  var index;

  for (index = 0; index < votersDetails.length; index++) {
    if (votersDetails[index].email == votersInput || votersDetails[index].phonenumber == votersInput) {
      found = true;
      break;
    }
  }

  if (found) {
    myPassword.innerHTML = "Your Voter's Key is " + votersDetails[index].key + " " + " while your Voter's ID is " + votersDetails[index].id;
    myPassword.style.color = "white"
    myPassword.style.backgroundColor = "red"
  } else {
    myPassword.innerHTML = "We apologize, but the information provided appears to be incorrect. Please review your ID, Email, or Phone Number and kindly retry."
    myPassword.style.color = "red"
    myPassword.style.backgroundColor = "#ffe6e6"
  }
}








function fingerprint() {
  loading.innerHTML = `Fingerprint Scanner Reading Your finger`;
  let waitingTime = setInterval(function () {
    if (true) {
      loading.innerHTML = "finger moved too fast. Try again";
      //window.location.href = "e-voting-contestantPage.html";
    }
  }, 5000);
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
if (localStorage.myVoteChoice) {
  var oldResult = JSON.parse(localStorage.getItem("myVoteChoice"));
  electionResult = oldResult;
}




var lastClickedFingerprint = null;

function myChoice(tdElement, para, para2) {
  // If a previous fingerprint was clicked, reset its background color to white
  if (lastClickedFingerprint) {
    lastClickedFingerprint.style.backgroundColor = '';
  }

  // Set the background color of the currently clicked td to red
  tdElement.style.backgroundColor = 'red';

  // Store the currently clicked td as the last clicked
  lastClickedFingerprint = tdElement;

  var myElectionResult = {
    myElectionChoice: para,
    myElectionChoiceName: para2,
  };
  electionResult.splice(0, 1, myElectionResult);
  localStorage.setItem("myVoteChoice", JSON.stringify(electionResult));
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
      electionResult = JSON.parse(localStorage.getItem("myVoteChoice"));
      sweetAlert.style.display = "flex";
      sweetAlert.innerHTML = `
    <div class="w-100 bg-light h-75 m-auto d-flex flex-column sweet-alert-modal-content">
          <div class=" sweet-alert d-flex justify-content-center"><i class="fas fa-check m-auto"></i></div>
          <div class="w-100">
            <h3 class="sweet-alert-h3 text-center"><p>Thank you for voting</p>  <strong id="mySelf">${firstN} ${lastN}</strong> <p class="fs-3 mt-2">Voting successful, remember to print or screenshot your volt's result.</p></h3>
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

var myStateElectionResult = [];
if (localStorage.myStateVoteChoice) {
  var myStateOldResult = JSON.parse(localStorage.getItem("myStateVoteChoice"));
  myStateElectionResult = myStateOldResult;
}



var lastClickedFingerprint = null;

function  myStateChoice(tdElement, para, para2) {
  if (lastClickedFingerprint) {
    lastClickedFingerprint.style.backgroundColor = '';
  }

  tdElement.style.backgroundColor = 'red';

  lastClickedFingerprint = tdElement;

  var myStateElectionResultDetails = {
    myStateElectionChoice: para,
    myStateElectionChoiceName: para2,
    // myElectionChoiceImg: picture1,
  };
  myStateElectionResult.splice(0, 1, myStateElectionResultDetails);
  localStorage.setItem(
    "myStateVoteChoice",
    JSON.stringify(myStateElectionResult)
  );
}

// function myStateChoice(para, para2) {
//   var myStateElectionResultDetails = {
//     myStateElectionChoice: para,
//     myStateElectionChoiceName: para2,
//     // myElectionChoiceImg: picture1,
//   };
//   myStateElectionResult.splice(0, 1, myStateElectionResultDetails);
//   localStorage.setItem(
//     "myStateVoteChoice",
//     JSON.stringify(myStateElectionResult)
//   );
// }

myOwnVoteResult = "";
myOwnVoltResultName = "";
myOwnSelf = "";

function dispMyStateChoice() {
  let firstN;
  let lastN;
  for (let index = 0; index < votersDetails.length; index++) {
    firstN = `${votersDetails[index].fname}`;
    lastN = `${votersDetails[index].lname}`;
  }
  if (myStateElectionResult.length == 0) {
    alert("You've not made any choice, Please select a choice first");
  } else {
    for (let index = 0; index < myStateElectionResult.length; index++) {
      myStateElectionResult = JSON.parse(
        localStorage.getItem("myStateVoteChoice")
      );
      sweetAlert.style.display = "flex";
      sweetAlert.innerHTML = `
    <div class="w-100 bg-light h-75 m-auto d-flex flex-column sweet-alert-modal-content">
          <div class=" sweet-alert d-flex justify-content-center"><i class="fas fa-check m-auto"></i></div>
          <div class="w-100">
            <h3 class="sweet-alert-h3 text-center"><p>Thank you for voting</p>  <strong id="myOwnSelf">${firstN} ${lastN}</strong> <p class="fs-3 mt-2">Voting successful, remember to print or screenshot your volt's result.</p></h3>
          </div>
          <div class="m-2 text-center fw-bold text-uppercase">
          <table class="table w-100 fs-6 ">
            <tr>
              <th>Name</th>
              <th>Party logo</th>
              <th>Party Name</th>
            </tr>
            <tr>
              <td id="myOwnVoltResultName">${myStateElectionResult[index].myStateElectionChoiceName}</td>
              <td></td>
              <td id="myOwnVoltResult" class="">${myStateElectionResult[index].myStateElectionChoice}</td>
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

function next() {}

function finish() {
  let yes = confirm(
    `Are you sure you want to finish voting? \nNote that once you click 'OK' button, you cant make any choice again and you can't vote again. Please feel free to make your choice before clicking 'OK' button  \nYou can click 'Cancel' button here and click 'My choice' button to view your vote choice \nThanks`
  );
  if (yes) {
    storePresidentialResult();
    storeGovernorshipResult();
  } else {
  }
}

var allPresidentialElectionResult = [];
if (localStorage.presidentialResults) {
  var oldAllResult = JSON.parse(localStorage.getItem("presidentialResults"));
  allPresidentialElectionResult = oldAllResult;
}

function storePresidentialResult() {
  let myStoreName,
    myStoreState,
    myStoreEmail,
    myStoreChoice,
    myStoreId,
    myStorePhoneNumber;
  for (let index = 0; index < votersDetails.length; index++) {
    myStoreName = `${votersDetails[index].fname}`;
    myStoreState = `${votersDetails[index].state}`;
    myStoreEmail = `${votersDetails[index].email}`;
    myStoreId = `${votersDetails[index].id}`;
    myStorePhoneNumber = `${votersDetails[index].phonenumber}`;
  }
  for (let index = 0; index < electionResult.length; index++) {
    myStoreChoice = `${electionResult[index].myElectionChoice}`;
  }
  var allVotersElectionResult = {
    name: myStoreName,
    myState: myStoreState,
    myEmail: myStoreEmail,
    myLatestChoice: myStoreChoice,
    myId: myStoreId,
    myPhoneNumber: myStorePhoneNumber,
  };
  electionResult.splice(0);
  localStorage.setItem("myVoteChoice", JSON.stringify(electionResult));

  allPresidentialElectionResult.push(allVotersElectionResult);
  localStorage.setItem(
    "presidentialResults",
    JSON.stringify(allPresidentialElectionResult)
  );
  window.location.href = "index.html";
}

var stateGovElection = [];
if (localStorage.myStateGovernorshipResult) {
  var oldGov = JSON.parse(localStorage.getItem("myStateGovernorshipResult"));
  stateGovElection = oldGov;
}

function storeGovernorshipResult() {
  let myStoreName, myStoreState, myStoreEmail, myStoreChoice;
  for (let index = 0; index < votersDetails.length; index++) {
    myStoreName = `${votersDetails[index].fname}`;
    myStoreState = `${votersDetails[index].state}`;
    myStoreEmail = `${votersDetails[index].email}`;
  }
  for (let index = 0; index < myStateElectionResult.length; index++) {
    myStoreChoice = `${myStateElectionResult[index].myStateElectionChoice}`;
  }
  var allVotersElectionResult = {
    name: myStoreName,
    myState: myStoreState,
    myEmail: myStoreEmail,
    myStateLatestChoice: myStoreChoice,
  };
  myStateElectionResult.splice(0);
  localStorage.setItem(
    "myStateVoteChoice",
    JSON.stringify(myStateElectionResult)
  );

  stateGovElection.push(allVotersElectionResult);
  localStorage.setItem(
    "myStateGovernorshipResult",
    JSON.stringify(stateGovElection)
  );
  window.location.href = "index.html";
}

var inecChairman = [];
if (localStorage.InecChairmanDetails) {
  var oldInecChairman = JSON.parse(localStorage.getItem("InecChairmanDetails"));
  inecChairman = oldInecChairman;
}

function chairmanReg() {
  if (firstName.value == "" || lastName.value == "" || email.value == "" || pass.value == "") {
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
    window.location.href = "inec-chairman-loginPage.html";
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
    window.location.href = "toFinal.html";
  } else {
    alert("Incorrect details, Kindly please check what you enter and re-type");
  }
}

function howPeopleVote(para) {
  para;
}

function toPresidentialVotingPage() {
  window.location.href = "e-voting-presidentialVotingPage.html";
}

function toGovernorshipVotingPage() {
  window.location.href = "e-voting-governorshipVotingPage.html";
  // generalDiv.innerHTML = "";
  stateGov();
}

function toINECChairman() {
  window.location.href = "inec-chairman-registration-page.html"
}



function stateGov() {
  generalDiv.innerHTML = "";
  for (let index = 0; index < votersDetails.length; index++) {
    if (votersDetails[index].state == "oyo") {
      generalDiv.innerHTML = `
      <table
          class="table table-hover table-bordered border-success table-responsive w-100 border-5 voting-page"
          id="oyoGovElection"
        >
          <caption-top
            class="text-uppercase d-flex justify-content-center w-100 pt-5 pb-3 bg-success text-white captin-caption"
            >The list of election contestant in oyo state, their party logo &
            names and the fingerprint</caption-top
          >
          <thead class="text-center">
            <tr class="table-active w-100">
              <th scope="row" class="col-1">#</th>
              <th scope="row" colspan="2" class="col-6">names</th>
              <th scope="row" class="col-2">party logo</th>
              <th scope="row" class="col-3">fingerprint</th>
            </tr>
          </thead>
          <tbody>
            <tr class="w-100 p-4">
              <th scope="row" class="col-1">1</th>
              <td class="col-3" id="ap">adelabu adebayo adekola</td>
              <td class="col-3" id="ap2">ayandele abiodun ayanfemi</td>
              <td class="col-2">
                <img src="pic/ap.jpeg" alt="" />
                <h3>ap</h3>
              </td>
              <td
                class="col-3"
                onclick="myStateChoice(this, 'ap', 'adelabu adebayo adekola  <br> & <br>  ayandele abiodun ayanfemi')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">2</th>
              <td id="aa">ajekigbe lateef olaniyi</td>
              <td id="aa2">fawole ajiboye taofeek</td>
              <td class="col-2">
                <img src="pic/aa.jpeg" alt="" />
                <h3>aa</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'aa', 'ajekigbe lateef olaniyi <br> & <br> fawole ajiboye taofeek')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">3</th>
              <td id="aac">okedara mojeed</td>
              <td id="aac2">oladimeji idowu ayomide</td>
              <td class="col-2">
                <img src="pic/aac.jpeg" alt="" />
                <h3>aac</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'aac', 'okedara mojeed <br> & <br> oladimeji idowu ayomide')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">4</th>
              <td id="adc">ajadi bamidele ganiyu</td>
              <td id="adc2">oyewole oyatayo emmanuel</td>
              <td class="col-2">
                <img src="pic/adc.jpeg" alt="" />
                <h3>adc</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'adc', 'ajadi bamidele ganiyu <br> & <br> oyewole oyatayo emmanuel')"
              >
                  <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">5</th>
              <td id="adp">yusuf akim adebola</td>
              <td id="adp2">daniels adigun modupe</td>
              <td class="col-2">
                <img src="pic/adp.jpeg" alt="" />
                <h3>adp</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'adp', 'yusuf akim adebola <br> & <br> daniels adigun modupe')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">6</th>
              <td id="apc">folarin kolawole teslim</td>
              <td id="apc2">okunlola david oluwafemi</td>
              <td class="col-2">
                <img src="pic/apc.png" alt="" />
                <h3>apc</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'apc', 'folarin kolawole teslim <br> & <br> okunlola david oluwafemi')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">7</th>
              <td id="apga">adeshina adewale excel</td>
              <td id="apga2">oladepo john oladejo</td>
              <td class="col-2">
                <img src="pic/apga.png" alt="" />
                <h3>apga</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'apga', 'adeshina adewale excel <br> & <br> oladepo john oladejo')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">8</th>
              <td id="lp">akinwale tawfiq tayo</td>
              <td id="lp2">akanji esther adebimpe</td>
              <td class="col-2">
                <img src="pic/lp.png" alt="" />
                <h3>lp</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'lp', 'akinwale tawfiq tayo <br> & <br> akanji esther adebimpe')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">9</th>
              <td id="nnpp">popoola olukayode joshua</td>
              <td id="nnpp2">adesope modinat atinuke</td>
              <td class="col-2">
                <img src="pic/nnpp.jpeg" alt="" />
                <h3>nnpp</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'nnpp', 'popoola olukayode joshua <br> & <br> adesope modinat atinuke')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">10</th>
              <td id="pdp">makinde oluseyi abiodun</td>
              <td id="pdp2">lawal adebayo adeleke</td>
              <td class="col-2">
                <img src="pic/pdp.png" alt="" />
                <h3>pdp</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'pdp', 'makinde oluseyi abiodun <br> & <br> lawal adebayo adeleke')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">11</th>
              <td id="sdp">lana michael</td>
              <td id="sdp2">aloyinlapa abdur rahman</td>
              <td class="col-2">
                <img src="pic/sdp.png" alt="" />
                <h3>sdp</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'sdp', 'lana michael <br> & <br> aloyinlapa abdur rahman')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">12</th>
              <td id="ypp">euba aduragbemi</td>
              <td id="ypp2">ojewole jeleel</td>
              <td class="col-2">
                <img src="pic/ypp.png" alt="" id="im" />
                <h3>ypp</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'ypp', 'euba aduragbemi <br> & <br>  ojewole jeleel')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
          </tbody>
        </table>
      
      
      `;
    } else if (votersDetails[index].state == "lagos") {
      generalDiv.innerHTML = `
      <table
          class="table table-hover table-bordered border-success table-responsive w-100 border-5 voting-page"
          id="oyoGovElection"
        >
          <caption-top
            class="text-uppercase d-flex justify-content-center pt-5 pb-3 bg-success text-white captin-caption"
            >The list of election contestant in lagos state, their party logo &
            names and the fingerprint</caption-top
          >
          <thead class="text-center">
            <tr class="table-active w-100">
              <th scope="row" class="col-1">#</th>
              <th scope="row" colspan="2" class="col-6">names</th>
              <th scope="row" class="col-2">party logo</th>
              <th scope="row" class="col-3">fingerprint</th>
            </tr>
          </thead>
          <tbody>
            <tr class="w-100 p-4">
              <th scope="row" class="col-1">1</th>
              <td class="col-3" id="ap">dickson hakeem olaogun</td>
              <td class="col-3" id="ap2">mate caroline emimie</td>
              <td class="col-2">
                <img src="pic/ap.jpeg" alt="" />
                <h3>ap</h3>
              </td>
              <td
                class="col-3"
                onclick="myStateChoice(this, 'ap','dickson hakeem olaogun <br> & <br> mate caroline emimie')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">2</th>
              <td id="aa">balogun tope abdulrazaq</td>
              <td id="aa2">salako oluwatosin mautin</td>
              <td class="col-2">
                <img src="pic/aa.jpeg" alt="" />
                <h3>aa</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'aa', 'balogun tope abdulrazaq <br> & <br> salako oluwatosin mautin')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">3</th>
              <td id="aac">olayiwola akeem olaide</td>
              <td id="aac2">eze benneth segun</td>
              <td class="col-2">
                <img src="pic/aac.jpeg" alt="" />
                <h3>aac</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'aac', 'olayiwola akeem olaide <br> & <br> eze benneth segun')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">4</th>
              <td id="adc">doherty olufunso adeshina</td>
              <td id="adc2">giwa amu rosemary</td>
              <td class="col-2">
                <img src="pic/adc.jpeg" alt="" />
                <h3>adc</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'adc', 'doherty olufunso adeshina <br> & <br> giwa amu rosemary')"
              >
                <button class="btn btn-light w-100" id="fingers">
                  <i class="fas fa-fingerprint"></i>
                </button>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">5</th>
              <td id="adp">bamidele ishola</td>
              <td id="adp2">adewusi omobola tawakalit</td>
              <td class="col-2">
                <img src="pic/adp.jpeg" alt="" />
                <h3>adp</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'adp', 'doherty olufunso adeshina <br> & <br> adewusi omobola tawakalit')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">6</th>
              <td id="apc">sanwo-olu babajide olusola</td>
              <td id="apc2">hamzat kadri obafemi</td>
              <td class="col-2">
                <img src="pic/apc.png" alt="" />
                <h3>apc</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'apc', 'sanwo-olu babajide olusola <br> & <br> hamzat kadri obafemi')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">8</th>
              <td id="lp">rhodes-vivour gbadebo patrick</td>
              <td id="lp2">oyefusi abiodun adetola</td>
              <td class="col-2">
                <img src="pic/lp.png" alt="" />
                <h3>lp</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'lp', 'rhodes-vivour gbadebo patrick <br> & <br> oyefusi abiodun adetola')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">9</th>
              <td id="nnpp">jim-kamal olarewaju olalekan</td>
              <td id="nnpp2">abiola faosa koya</td>
              <td class="col-2">
                <img src="pic/nnpp.jpeg" alt="" />
                <h3>nnpp</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'nnpp', 'jim-kamal olarewaju olalekan <br> & <br> abiola faosa koya')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">10</th>
              <td id="pdp">adediran azeez olajide</td>
              <td id="pdp2">akindele ayotunde olufunke</td>
              <td class="col-2">
                <img src="pic/pdp.png" alt="" />
                <h3>pdp</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'pdp', 'adediran azeez olajide <br> & <br> akindele ayotunde olufunke')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">11</th>
              <td id="sdp">uthman olakunle taofeek</td>
              <td id="sdp2">animasahun morenikeji abeni</td>
              <td class="col-2">
                <img src="pic/sdp.png" alt="" />
                <h3>sdp</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'sdp', 'uthman olakunle taofeek <br> & <br> animasahun morenikeji abeni')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
            <tr class="w-100">
              <th scope="row" class="col-1">12</th>
              <td id="ypp">ajayi wasiu adebayo</td>
              <td id="ypp2">shodoke temitayo</td>
              <td class="col-2">
                <img src="pic/ypp.png" alt="" id="im" />
                <h3>ypp</h3>
              </td>
              <td
                onclick="myStateChoice(this, 'ypp', 'ajayi wasiu adebayo <br> & <br> shodoke temitayo')"
                id="finger"
              >
                <i class="fas fa-fingerprint"></i>
              </td>
            </tr>
          </tbody>
        </table>
      `;
    } else if ((votersDetails[index].state == "osun", "ondo", "kwara")) {
      generalDiv.innerHTML = `
      No Governorship election in the state you select, kindly move on to another election type
      `;
    }
  }
}

// (() => {
//   "use strict";

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   const forms = document.querySelectorAll(".needs-validation");

//   // Loop over them and prevent submission
//   Array.from(forms).forEach((form) => {
//     form.addEventListener(
//       "submit",
//       (event) => {
//         if (!form.checkValidity()) {
//           event.preventDefault();
//           event.stopPropagation();
//         }

//         form.classList.add("was-validated");
//       },
//       false
//     );
//   });
// })();
