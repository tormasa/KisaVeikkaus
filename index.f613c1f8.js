!function(){let e,t=new XMLHttpRequest;t.open("GET","https://api.jsonbin.io/b/6097bb94a23274124b00f424"),t.responseType="json",t.send();let n=[];function o(){document.getElementById("mainBlock").style.display="none",document.getElementById("alkulohkoBlock").style.display="block",document.getElementById("groupError").innerText=" "}function l(){var t=document.getElementById("groupForm").elements;n=[];for(var o=0;o<t.length;o++)t[o].checked&&n.push(o);var l=n.length;if(l<16)document.getElementById("groupError").innerText="LIIAN VÄHÄN VALITTUJA JOUKKUEITA!";else if(l>16)document.getElementById("groupError").innerText="LIIAN PALJON VALITTUJA JOUKKUEITA!";else{const t=e.teams;var d=!0;for(o=0;o<6;o++){for(var c=0,a=0;a<n.length;a++)t[n[a]].lohko==(o+10).toString(36).toUpperCase()&&c++;if(c>3){document.getElementById("groupError").innerText="YHDESTÄ LOHKOSTA VOI PÄÄSTÄ JATKOON VAIN KOLME PARASTA!",d=!1;break}}d&&(document.getElementById("mainBlock").style.display="block",document.getElementById("alkulohkoBlock").style.display="none")}}function d(){console.log(document.getElementById("veikkaajanNimi").value)}function c(e,t,n){const o=t.teams;var l=document.createElement("div"),d=document.createElement("h3"),c=document.createTextNode("LOHKO "+e);d.appendChild(c),l.appendChild(d);for(var a=0;a<o.length;a++)if(o[a].lohko==e){var r=document.createElement("label"),m=document.createElement("INPUT"),i=document.createElement("span");r.innerHTML=o[a].name,m.setAttribute("type","checkbox"),r.className="container",i.className="checkmark",r.appendChild(m),r.appendChild(i),l.appendChild(r),m.value=a}(n?document.getElementById("groupPairCol"):document.getElementById("groupPairlessCol")).appendChild(l)}t.onload=function(){e=t.response;for(var n=0;n<6;n++)c((n+10).toString(36).toUpperCase(),e,n%2!=0);document.getElementById("alkulohkoButton").addEventListener("click",o),document.getElementById("backButtonAlkulohko").addEventListener("click",l),document.getElementById("sendButton").addEventListener("click",d)},document.getElementById("mainBlock").style.display="block",document.getElementById("alkulohkoBlock").style.display="none"}();
//# sourceMappingURL=index.f613c1f8.js.map