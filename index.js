document.getElementById("alkulohkoButton").addEventListener("click", openAlkulohko);
document.getElementById("backToMainButton").addEventListener("click", openMain);
document.getElementById("sendButton").addEventListener("click", send);

document.getElementById("mainBlock").style.display = "block";
document.getElementById("alkulohkoBlock").style.display = "none";

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