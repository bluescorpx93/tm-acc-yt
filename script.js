var headElem = document.getElementsByTagName("head");
var bodyElem = document.getElementsByTagName("body");

var titleElem = document.createElement("title");
titleElem.innerHTML = "TM.YT.ACC";

var loadBtn = document.createElement("button");
loadBtn.id='loadBtn';
loadBtn.innerHTML = 'Load'

var requestStatusDiv = document.createElement('p');

var infoDiv = document.createElement('div');
infoDiv.id='infoDiv';

var pageHeading = document.createElement("h3");
pageHeading.innerHTML = "Traversy Media AJAX Crash Course"

headElem[0].prepend(titleElem);
bodyElem[0].insertBefore(pageHeading, bodyElem[0].firstChild);
bodyElem[0].append(requestStatusDiv);
bodyElem[0].append(loadBtn);
bodyElem[0].append(infoDiv);

loadBtn.addEventListener("click", loadInfo);

function loadInfo(){
	var xhreq = new XMLHttpRequest();
	xhreq.open('GET', 'sampleText.txt', true);
	// console.log('readystate', xhreq.readyState);

	xhreq.onload = function(){
		if (this.status == 200){
			requestStatusDiv.innerHTML = "Loaded";
			var newP = document.createElement("p");
			newP.innerHTML = this.responseText;
			infoDiv.append(newP);
			// console.log(this.responseText);
		}
	}

  xhreq.onprogress = function(){
  	requestStatusDiv.innerHTML = "Loading Please Wait"
  }

	//xhreq.onreadystatechange = function(){
	//	if (this.readyState == 4 && this.status == 200){
			// console.log(this.responseText);
	//	}
	//}

	xhreq.onerror = function(){
		console.log('Connection Error');
	}
	xhreq.send();
}
