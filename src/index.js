// Team json
let requestURL = 'https://api.jsonbin.io/b/60a18b13d576d41d833eb495';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

let teamData;
let qualGroupTeams = [];

request.onload = function() {
    teamData = request.response;
    // Alkulohkojen luonti kun on ladattu json
    for (var i = 0; i < 6; i++) {
        //createLohko((i+10).toString(36).toUpperCase(), teamData, i % 2 != 0);
    }

    createLohkot();
    createTeamSelection("puolivalierat");

    // Lisätään toiminnallisuudet painikkeisiin vasta kun on saatu vastaus json-viestiin
    document.getElementById("alkulohkoButton").addEventListener("click", openAlkulohko);
    document.getElementById("backButtonAlkulohko").addEventListener("click", openMainFromGroup);
    document.getElementById("puolivalieratButton").addEventListener("click", openPuolivaliera);
    document.getElementById("sendButton").addEventListener("click", send);
}

showOneBlock("mainBlock");

function showOneBlock(block) {
    document.getElementById("mainBlock").style.display = "none";
    document.getElementById("alkulohkoBlock").style.display = "none";
    document.getElementById("puolivalieratBlock").style.display = "none";

    document.getElementById(block).style.display = "block";
}

function openAlkulohko() {
    showOneBlock("alkulohkoBlock");
    document.getElementById("groupError").innerText = " ";
}

function openMainFromGroup() {
    var formElements = document.getElementById("groupForm").elements;
    qualGroupTeams = [];

    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].checked) {
            qualGroupTeams.push(formElements[i].name);
        }
    }

    var count = qualGroupTeams.length;

    if (count < 16) {
        document.getElementById("groupError").innerText = "LIIAN VÄHÄN VALITTUJA JOUKKUEITA!";
    }
    else if (count > 16) {
        document.getElementById("groupError").innerText = "LIIAN PALJON VALITTUJA JOUKKUEITA!";
    }
    else {
        var teams = teamData['teams'];
        var valid = true;

        // Käydään lohkot läpi
        for (var i = 0; i < 6; i++) {
            var groupCount = 0;
            //console.log("group " + (i+10).toString(36).toUpperCase());

            for (var j = 0; j < formElements.length; j++) {    
                //console.log("value: " +formElements[j].value);
                if (formElements[j].checked) {
                    for (var k = 0; k < teams.length; k++) {
                        if (teams[k].teamID == formElements[j].value) {
                            if (teams[k].lohko == (i+10).toString(36).toUpperCase()) groupCount++;
                            break;
                        }
                    }
                }
            }
            
            if (groupCount > 3) {
                document.getElementById("groupError").innerText = "YHDESTÄ LOHKOSTA VOI PÄÄSTÄ JATKOON VAIN KOLME PARASTA!";
                valid = false;

                break;
            }
        }

        if (valid) {
            showOneBlock("mainBlock");
        }
    }
    
}

function openPuolivaliera() {
    showOneBlock("puolivalieratBlock");
}

function openMainFromPuolivaliera() {
    openMainFromTeamSelection("puolivalierat", 8)
}

function openMainFromTeamSelection(stage, choiceCount) {
    var formElements = document.getElementById(stage +"Form").elements;
    var count = 0;

    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].checked) {
            count++;
        }
    }

    if (count != choiceCount) {
        console.log("ei ole kahdeksan");
    }
    else {
        console.log("on kahdeksan");
    }
}

function send() {
    document.getElementById("sendLog").innerText = "";

    var sendable = checkNameValid() && checkGroupIDValid() && checkGroupQualValid();

    if (sendable) {
        var item = {};
        item["name"] = document.getElementById("veikkaajanNimi").value;
        item["group"] = document.getElementById("ryhmaTunnus").value;

        var grQual = [];
        var teams = teamData['teams'];

        for (var i = 0; i < qualGroupTeams.length; i++) {
            var groupItem = {};
            groupItem["groupQualTeam"] = qualGroupTeams[i];
            grQual.push(groupItem);
        }

        item["groupQualifiers"] = grQual;

        console.log(JSON.stringify(item));
    }
}

function createLohkot() {
    const teams = teamData['teams'];
    const blockDiv = document.getElementById("alkulohkoTeams");
    var lohkoDivs = [];

    for (var i = 0; i < 6; i++) {
        var lohkoHeaderDiv = document.createElement("div");
        lohkoHeaderDiv.innerHTML = "LOHKO " +(i+10).toString(36).toUpperCase();
        lohkoHeaderDiv.className = "alkulohko-header";

        blockDiv.appendChild(lohkoHeaderDiv);
        lohkoDivs.push(lohkoHeaderDiv);
    }

    for (var i = 0; i < teams.length; i++) {
        var teamDiv = document.createElement("div");
        var label = document.createElement("label");
        var checkBox = document.createElement("INPUT");
        var span = document.createElement("span");

        span.innerHTML = teams[i].name;

        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("name", teams[i].name);
        checkBox.value = teams[i].teamID;

        teamDiv.id = "ck-button";

        label.appendChild(checkBox);
        label.appendChild(span);
        teamDiv.appendChild(label);

        var lohkoInt = beforeLohko(teams[i].lohko);
        if (lohkoInt < 0) blockDiv.appendChild(teamDiv);
        else blockDiv.insertBefore(teamDiv, lohkoDivs[lohkoInt]);
    }
}

function beforeLohko(kirjain) {
    switch(kirjain) {
        case "A":
            return 1;
        case "B":
            return 2;
        case "C":
            return 3;
        case "D":
            return 4;
        case "E":
            return 5;
        default:
            return -1;
    }
}

function createTeamSelection(stage) {
    const teams = teamData['teams'];
    var blockElement = document.getElementById(stage +"Block");

    var form = document.createElement("FORM");
    form.id = stage +"Form";
    blockElement.appendChild(form);

    var teamsDiv = document.createElement("div");
    teamsDiv.className = "team-selection";
    form.appendChild(teamsDiv);

    for (var i = 0; i < teams.length; i++) {
        var teamDiv = document.createElement("div");
        var label = document.createElement("label");
        var checkBox = document.createElement("INPUT");
        var span = document.createElement("span");

        span.innerHTML = teams[i].name;

        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("name", teams[i].name);
        checkBox.value = teams[i].teamID;

        teamDiv.id = "ck-button";

        label.appendChild(checkBox);
        label.appendChild(span);
        teamDiv.appendChild(label);

        teamsDiv.appendChild(teamDiv);
    }

    var buttonDiv = document.createElement("div");
    buttonDiv.className = "team-selection-button-container";
    form.appendChild(buttonDiv);

    var confirmButton = document.createElement("BUTTON");
    confirmButton.innerHTML = "VAHVISTA";
    confirmButton.className = "send-button";
    confirmButton.type = "button";
    buttonDiv.appendChild(confirmButton);

    if (stage == "puolivalierat") confirmButton.addEventListener("click", openMainFromPuolivaliera);
}

function checkNameValid() {
    var name = document.getElementById("veikkaajanNimi").value;

    if (name.length < 1) {
        document.getElementById("sendLog").innerText = "Nimi puuttuu!";

        return false;
    }

    return true;
}

function checkGroupIDValid() {
    var group = document.getElementById("ryhmaTunnus").value;

    if (group.length < 1) {
        document.getElementById("sendLog").innerText = "Tunnus puuttuu!";

        return false;
    }

    return true;
}

function checkGroupQualValid() {
    if (qualGroupTeams.length != 16) {
        document.getElementById("sendLog").innerText = "Alkulohkoveikkaukset puuttuu!";

        return false;
    }

    return true;
}