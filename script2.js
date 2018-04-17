document.getElementsByTagName("title")[0].innerText = "TM-ACC V2";

var bodyElem = document.getElementsByTagName("body")[0];
var getUserBtn = document.createElement("button");
getUserBtn.id = "getUserButton";
getUserBtn.innerText = "Get User";
getUserBtn.addEventListener("click", loadUserData);

var getUsersBtn = document.createElement("button");
getUsersBtn.id="getUsersButton";
getUsersBtn.innerText="Get Users";
getUsersBtn.addEventListener("click", loadUsersData);

var progStatusDiv = document.createElement("div");

var dataDiv = document.createElement("div")
bodyElem.insertBefore(dataDiv, bodyElem.firstChild);    
bodyElem.append(progStatusDiv);
bodyElem.append(getUserBtn, getUsersBtn);

var pElem = document.createElement("p");

function loadUserData(){
  var xhreq = new XMLHttpRequest();
  xhreq.open('GET', 'user.json', true);
  xhreq.onload = function(){
  	pElem.innerText = "Data Loaded";
  	progStatusDiv.insertBefore(pElem, progStatusDiv.firstChild);
  	var data = JSON.parse(this.responseText);
  	var htmlContent = `<strong> ${data.name} </strong> with ID: ${data.id} has email: ${data.email}`;
  	dataDiv.innerHTML += htmlContent;
  }
  xhreq.onerror = function(){
  	pElem.innerText = "Connection Error";
  	progStatusDiv.insertBefore(pElem, progStatusDiv.firstChild);
  }
  xhreq.send();
}

function loadUsersData(){
	var xhreq = new XMLHttpRequest();
	xhreq.open('GET', 'users.json', true);
	xhreq.onload = function(){
		pElem.innerText = "All Data Loaded ";
		progStatusDiv.insertBefore(pElem, progStatusDiv.firstChild);
		var data = JSON.parse(this.responseText);
		var htmlContent ="";
		for (var i=0; i< data.length; i++){
			htmlContent += `<p> <strong> ${data[i].name} </strong> with ID: ${data[i].id} has email: ${data[i].email}</p>`;
		}
		dataDiv.innerHTML += htmlContent;
	}
	xhreq.onerror = function(){
		console.log("Connection Error");
	}
	xhreq.send();
}
