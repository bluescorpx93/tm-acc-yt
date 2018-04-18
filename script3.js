var title = document.createElement('title');
title.innerText = "TM ACC 3";

var head = document.getElementsByTagName("head")[0];
head.appendChild(title);

var loadTodoBtn = document.createElement("button");
loadTodoBtn.id='loadToDoBtn';
loadTodoBtn.innerText= "Load Todo";

var loadPhotosBtn = document.createElement("button");
loadPhotosBtn.id='loadPhotosBtn';
loadPhotosBtn.innerText = "Load Photos";

var loadUsersBtn = document.createElement("button");
loadUsersBtn.id='loadUsersBtn';
loadUsersBtn.innerText = "Load Users";

var clearBtn = document.createElement("button");
clearBtn.id='clearAllBtn';
clearBtn.innerText = "Clear";

var bodyEl = document.getElementsByTagName("body")[0];
bodyEl.insertBefore(clearBtn, bodyEl.firstChild);
bodyEl.insertBefore(loadTodoBtn, clearBtn);
bodyEl.insertBefore(loadPhotosBtn, clearBtn);
bodyEl.insertBefore(loadUsersBtn, clearBtn);

var infoDiv = document.createElement("div");
infoDiv.id = 'info-div';
bodyEl.appendChild(infoDiv);

var previewDiv = document.createElement("div");
previewDiv.id='preview-div';
bodyEl.insertBefore(previewDiv, infoDiv);

var statusPara = document.createElement("p");
statusPara.id = 'status-p';
bodyEl.insertBefore(statusPara, infoDiv);

var htmlContent = "", demoSpan = "";

loadTodoBtn.addEventListener("click", loadTodos);
loadPhotosBtn.addEventListener("click", loadPhotos);
clearBtn.addEventListener("click", clearData);
loadUsersBtn.addEventListener("click", loadUsers);

function loadUsers(){
	clearData();
	var req = new XMLHttpRequest();
	const APIURL = "https://api.github.com/users";
	req.open('GET', APIURL, true);
	req.onload = function(){
		var serverData = JSON.parse(req.responseText);
		for (var i=0; i<10; i++){
			htmlContent += `<div> <p> ${i+1}. <strong>${serverData[i].login} </strong> </p> <img src='${serverData[i].avatar_url}' </div>`;
		}
		infoDiv.innerHTML = htmlContent;
		statusPara.innerText = "Loaded";
	}
	req.onerror = function(){
		statusPara.innerText = "Connection Error";
	}
	req.send();
}

function loadTodos(){
	clearData();
	var req = new XMLHttpRequest();
	const APIURL = "https://jsonplaceholder.typicode.com/todos";
	req.open('GET', APIURL, true);
	req.onload = function(){
		var serverData = JSON.parse(req.responseText);
		for (var i=0; i<10; i++){
			serverData[i].completed ? demoSpan = "Done" : demoSpan = "Not Done";
			htmlContent += `<p> ${i+1}. <strong>${serverData[i].title} </strong> ${demoSpan}</p>`;
		}
		infoDiv.innerHTML = htmlContent;
		statusPara.innerText = "Loaded";
	}
	req.onerror = function(){
		statusPara.innerText = "Connection Error";
	}
	req.send();
}

function loadPhotos(){
	clearData();
	var req = new XMLHttpRequest();
	const APIURL = "https://jsonplaceholder.typicode.com/photos";
	// const APIURL = "https://randomapi.com/api/e6ac05b947fd4f5eab6de20326b912ee";
	req.open('GET', APIURL, true);

	req.onload = function(){
		var serverData = JSON.parse(req.responseText);
		// var serverData = dataFromServer.results[0].shoppingItems;

		for (var i=0; i<10; i++){
			imgUrl = `${serverData[i].url}`
			htmlContent += `<div> 
												<p> ${i+1}. <strong>${serverData[i].title} </strong> </p> 
												<img src='${serverData[i].thumbnailUrl}' /> 
											</div>`;
		}

		infoDiv.innerHTML = htmlContent;
		statusPara.innerText = "Loaded";
	}
	req.onerror = function(){
		statusPara.innerText = "Connection Error";
	}
	req.send();
}

function showRealImg(imgUrl){
	// previewDiv.innerHTML = `<img src='${imgUrl}' />`;
	console.log(imgUrl);
}

function clearData(){
	htmlContent = "";
	infoDiv.innerHTML = "";
	statusPara.innerHTML = "";
	previewDiv.innerHTML ="";	
}