// Team json
let requestURL = 'https://api.jsonbin.io/b/6097bb94a23274124b00f424';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

document.getElementById("alkulohkoButton").addEventListener("click", openAlkulohko);
document.getElementById("backButtonAlkulohko").addEventListener("click", openMain);
document.getElementById("sendButton").addEventListener("click", send);

document.getElementById("mainBlock").style.display = "block";
document.getElementById("alkulohkoBlock").style.display = "none";

// Alkulohkojen luonti
for (var i = 0; i < 1; i++) {
    createLohko((i+10).toString(36).toUpperCase());
}


function openAlkulohko() {
    document.getElementById("mainBlock").style.display = "none";
    document.getElementById("alkulohkoBlock").style.display = "block";
}

function openMain() {
    document.getElementById("mainBlock").style.display = "block";
    document.getElementById("alkulohkoBlock").style.display = "none";
}

function send() {
    console.log(document.getElementById("veikkaajanNimi").value);
}

function createLohko(kirjain) {
    var div = document.createElement("div");
    var lohkoHeader = document.createElement("h3");
    var lohkoText = document.createTextNode("LOHKO " +kirjain);

    // Otsake
    lohkoHeader.appendChild(lohkoText);
    div.appendChild(lohkoHeader);

    // Joukkueet
    //var t1Button = document
    loadJSON(function(response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
        console.log(actual_JSON);
    });
    
    var alkulohkoBlock = document.getElementById("alkulohkoBlock");
    var backButton = document.getElementById("backButtonAlkulohko");
    alkulohkoBlock.insertBefore(div, backButton);
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'teams.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            console.log(xobj.responseText);
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);  
 }