// Team json
let requestURL = 'https://api.jsonbin.io/b/6097bb94a23274124b00f424';
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
        createLohko((i+10).toString(36).toUpperCase(), teamData, i % 2 != 0);
    }

    // Lisätään toiminnallisuudet painikkeisiin vasta kun on saatu vastaus json-viestiin
    document.getElementById("alkulohkoButton").addEventListener("click", openAlkulohko);
    document.getElementById("backButtonAlkulohko").addEventListener("click", openMainFromGroup);
    document.getElementById("sendButton").addEventListener("click", send);
}



document.getElementById("mainBlock").style.display = "block";
document.getElementById("alkulohkoBlock").style.display = "none";

function openAlkulohko() {
    document.getElementById("mainBlock").style.display = "none";
    document.getElementById("alkulohkoBlock").style.display = "block";
    document.getElementById("groupError").innerText = " ";
}

function openMainFromGroup() {
    var formElements = document.getElementById("groupForm").elements;
    qualGroupTeams = [];

    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].checked) {
            qualGroupTeams.push(i);
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
        const teams = teamData['teams'];
        var valid = true;

        // Käydään lohkot läpi
        for (var i = 0; i < 6; i++) {
            var groupCount = 0;
            //console.log("group " + (i+10).toString(36).toUpperCase());

            for (var j = 0; j < qualGroupTeams.length; j++) {    
                //console.log("value: " +formElements[j].value);
                if (teams[qualGroupTeams[j]].lohko == (i+10).toString(36).toUpperCase()) {
                    groupCount++;
                }
            }
            
            if (groupCount > 3) {
                document.getElementById("groupError").innerText = "YHDESTÄ LOHKOSTA VOI PÄÄSTÄ JATKOON VAIN KOLME PARASTA!";
                valid = false;

                break;
            }
        }

        if (valid) {
            document.getElementById("mainBlock").style.display = "block";
            document.getElementById("alkulohkoBlock").style.display = "none";
        }
    }
    
}

function send() {
    console.log(document.getElementById("veikkaajanNimi").value);
}

function createLohko(kirjain, obj, pair) {
    const teams = obj['teams'];

    var div = document.createElement("div");
    var lohkoHeader = document.createElement("h3");
    var lohkoText = document.createTextNode("LOHKO " +kirjain);

    // Otsake
    lohkoHeader.appendChild(lohkoText);
    div.appendChild(lohkoHeader);

    // Joukkueet
    //var t1Button = document
    for (var i = 0; i < teams.length; i++) {
        if (teams[i].lohko == kirjain) {
            var container = document.createElement("label");
            var checkBox = document.createElement("INPUT");
            var checkMark = document.createElement("span");

            container.innerHTML = teams[i].name;

            //button.innerHTML = teams[i].name;
            checkBox.setAttribute("type", "checkbox");

            container.className = "container";
            checkMark.className = "checkmark";
            
            container.appendChild(checkBox);
            container.appendChild(checkMark);
            div.appendChild(container);

            checkBox.value = i;
        }
    }
    
    var parent = (pair) ? document.getElementById("groupPairCol") : document.getElementById("groupPairlessCol");
    parent.appendChild(div);
}