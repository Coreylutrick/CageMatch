function printToDom(stringToPrint, divId)
{
    var divElement = document.getElementById(divId);
    divElement.innerHTML += stringToPrint;
}

const buildDomString = (fightArr) =>
{
  let domString = "";
    domString += `<div class="col-md-5 fighterCard">`;
    domString +=  `<h3>${fightArr.name}</h3>`;
    domString +=  `<img class="img-circle" src="${fightArr.gravatar_url}">`;
    domString +=    `<div class="row">`;
    domString +=      `<div class="col-md-12 badgeHolder">`;
    fightArr.badges.forEach(badge => 
      {
        domString +=  `<img class="badges" src="${badge.icon_url}">`;
      });
    domString +=      `</div>`;
    domString +=    `</div>`;
    domString +=  `<h2>${fightArr.points.total}</h2>`
    domString += `</div>`; 
  printToDom(domString, "profilePic");
};

let score = [];

const winnerDeclaration = (pointArr) => 
{
  domString= ""
  if(score[0] > score[1])
  {
    domString += `<div class="col-md-6 col-md-offset-3 winner">`;
    domString +=  `<h3>The winner is Player 1</h3>`;
    domString += `</div>`;
  }
  else if(score[0] < score[1])
  {
    domString += `<div class="col-md-6 col-md-offset-3 winner">`;
    domString +=  `<h3>The winner is Player 2</h3>`;
    domString += `</div>`; 
  }
  else if(score[0] === score[1])
  {
    domString += `<div class="col-md-6 col-md-offset-3 winner">`;
    domString +=  `<h3>The match was a tie!</h3>`;
    domString += `</div>`; 
  }
  printToDom(domString, "winner")
}

document.getElementById("button1").addEventListener("click", startApplication);

function executeThisCodeIfXHRFails() {
  console.log("something broke");
}

function executeThisCodeAfterFileLoaded() {
  const data = JSON.parse(this.responseText);
  buildDomString(data);
  score.push(data.points.total);
  startApplication2();
}

function executeThisCodeAfterFileLoaded2() {
  const data = JSON.parse(this.responseText);
  buildDomString(data);
  score.push(data.points.total);
  winnerDeclaration(score);
}

function startApplication()
{
  let value = document.getElementById("input1").value;
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
  myRequest.addEventListener("error", executeThisCodeIfXHRFails);
  myRequest.open("GET", "https://teamtreehouse.com/" + value + ".json");
  myRequest.send();
};

function startApplication2()
{
  let value = document.getElementById("input2").value;
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", executeThisCodeAfterFileLoaded2);
  myRequest.addEventListener("error", executeThisCodeIfXHRFails);
  myRequest.open("GET", "https://teamtreehouse.com/" + value + ".json");
  myRequest.send();
};

