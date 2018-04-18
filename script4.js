var title = document.createElement('title');
title.innerText = "TM ACC 4";

var head = document.getElementsByTagName("head")[0];
head.appendChild(title);

var createBtn = document.createElement("button");
createBtn.id='createBtn';
createBtn.innerText= "Add";
createBtn.addEventListener("click", createObj);

var loadDataByIdBtn = document.createElement('button');
loadDataByIdBtn.id='loadDataByIdBtn';
loadDataByIdBtn.innerText= "LoadByID";
loadDataByIdBtn.addEventListener("click", loadDataById);

var loadAllDataBtn = document.createElement("button");
loadAllDataBtn.id='loadAllDataBtn';
loadAllDataBtn.innerText= "Load All";
loadAllDataBtn.addEventListener("click", loadAllData);

var clearBtn = document.createElement("button");
clearBtn.id='clearAllBtn';
clearBtn.innerText = "Clear";
clearBtn.addEventListener("click", clearData);

var bodyEl = document.getElementsByTagName("body")[0];
bodyEl.appendChild(loadAllDataBtn);
bodyEl.appendChild(loadDataByIdBtn);
bodyEl.appendChild(clearBtn);
bodyEl.appendChild(createBtn);

var infoDiv = document.createElement("div");
infoDiv.id = 'info-div';
bodyEl.appendChild(infoDiv);

var previewDiv = document.createElement("div");
previewDiv.id='preview-div';
bodyEl.insertBefore(previewDiv, infoDiv);

var statusPTag = document.createElement("p");
statusPTag.id='status-info';
previewDiv.insertBefore(statusPTag, previewDiv.firstChild);

var htmlContent = "";
const APIURL = 'http://localhost:3000/api/pg/heroes';

function loadAllData(){
	clearData();
	var xhr = new XMLHttpRequest();
	xhr.open('GET', APIURL, true);
	xhr.onload = function(){
		statusPTag.innerText = "Conn Successful";
		var dataFromServer = JSON.parse(xhr.responseText);
		// for (var i=dataFromServer.length-1; i>=0; i--){
		for (var i=0; i< dataFromServer.length; i++){
			htmlContent += `<div> <h3> ${dataFromServer[i].name} </h3> <p> ID: ${dataFromServer[i].id} Age: ${dataFromServer[i].age} </p> <p> Created At: ${dataFromServer[i].createdAt.slice(0,10)}</p></div>`
		}
		infoDiv.innerHTML += htmlContent;
		statusPTag.innerText += ` Fetched ${dataFromServer.length} Items`;
	}
	xhr.onerror = function(){
		statusPTag.innerText = "Connection Error"
	}
	xhr.send();
}


function createObj(){
	clearData();
	renderCreateForm();
	var fSubmitBtn = document.getElementById('createHeroBtn');
	var fCancelBtn = document.getElementById('cancelHeroCreateBtn');

	fSubmitBtn.addEventListener('click', function(event){
		event.preventDefault();
		var heroForm = document.getElementById('heroForm');
		
		if (!heroForm.nameInput.value || !heroForm.ageInput.value) {
			statusPTag.innerHTML = "<strong>Please Type Sth!</strong>";
		}	else if (!parseInt(heroForm.ageInput.value) || parseInt(heroForm.ageInput.value) <=0){
			statusPTag.innerHTML = "<strong>Age must be a Positive Integer!</strong>";
		} else {		
			var nameVal = document.getElementById('nameInput').value;
			var ageVal = document.getElementById('ageInput').value;
	    ageVal = parseInt(ageVal);

			var xhr = new XMLHttpRequest();
			xhr.open('POST', APIURL, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.onload = function(){
				loadAllData();
			};
			xhr.send(`name=${nameVal}&age=${ageVal}`);
		}
	});
	fCancelBtn.addEventListener('click', unrenderCreateForm);
}

function loadDataById(){
	clearData();
	renderLoadByIDForm();

	var fLoadByIDBtn = document.getElementById("loadByIDBtn");
	var fCancelHeroByIDBtn = document.getElementById("cancelHeroByIDBtn");

	fLoadByIDBtn.addEventListener('click', function(event){
		event.preventDefault();
		var loadByIdForm = document.getElementById('loadByIDForm');
		var _id = document.getElementById('loadByIDInput').value;

		if (!_id || !parseInt(_id)) {
			statusPTag.innerHTML = `Please Type Valid <strong> ID </strong>`;
		}	else if (isNaN(_id) || _id <=0){
			statusPTag.innerHTML = `<strong> ${_id} </strong> is not a<em> Positive Integer! </em>`;
		} else {
			var getByIdAPIURL = `${APIURL}/${parseInt(_id)}`;
			
			var xhr = new XMLHttpRequest();
			xhr.open('GET', getByIdAPIURL, true);
			xhr.onload = function(){
				var dataByID = JSON.parse(xhr.responseText);
				var htmlCont = `<div> 
													<h3> ${dataByID.name} </h3> 
													<p> Age: ${dataByID.age} CreatedAt: ${dataByID.createdAt.slice(0,10)}</p>
													<button id='editBtn' onclick="editData('${dataByID.name}', ${dataByID.age}, ${dataByID.id}, '${dataByID.createdAt.slice(0,10)}')"> Edit </button>
													<button id='deleteBtn' onclick="deleteObj(${dataByID.id})"> Delete </button> 
												</div>`;
				infoDiv.removeChild(loadByIdForm);
				statusPTag.innerHTML = `Showing Details for ID: ${dataByID.id}`;
				infoDiv.innerHTML += htmlCont;
			}	
			xhr.onerror = function(){
				statusPTag.innerHTML = "Connection Error";
			}
			xhr.send();
		}
	});
	fCancelHeroByIDBtn.addEventListener("click", unrenderLoadByIDForm);
}

function editData(name, age, id, createdAt){
	renderEditByIDForm(name, age, id);
	var fEditBtn = document.getElementById('editHeroBtn');
	var fCancelEditBtn = document.getElementById('cancelHeroEditBtn');
	var editByIDAPIURL = `${APIURL}/${id}`;

	fEditBtn.addEventListener("click", function(event){
		event.preventDefault();
		var newName = document.getElementById('editNameInput').value;
		var newAge = document.getElementById('editAgeInput').value;

		if (!newName || !newAge){
			statusPTag.innerHTML = "Please fill in values";
		} else if (!parseInt(newAge)){
			statusPTag.innerHTML = `${newAge} is not a positive Integer`;
		} else {
			var xhr = new XMLHttpRequest();
			xhr.open('PATCH', editByIDAPIURL, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.onload = function(){
				loadAllData();
			}
			xhr.onerror = function(){
				statusPTag.innerHTML = "Connection Error";
			}
			xhr.send(`name=${newName}&age=${newAge}`);
		}

	});
	fCancelEditBtn.addEventListener('click', function(){
		var htmlCont = `<div> 
											<h3> ${name} </h3> 
											<p> Age: ${age} CreatedAt: ${createdAt}</p>
											<button id='editBtn' onclick="editData('${name}', ${age}, ${id}, '${createdAt}')"> Edit </button>
											<button id='deleteBtn' onclick="deleteObj(${id})"> Delete </button>
										</div>`;

		statusPTag.innerHTML = `Showing Details for ID: ${id}`;
		infoDiv.innerHTML = htmlCont;
	});

}


function renderEditByIDForm(objName, objAge, objID){
	var formElem = document.createElement("form");
	formElem.id = "editByIDForm";
	formElem.method = "PATCH";

	var nameLabel = document.createElement("label");
	nameLabel.innerHTML = "Name";

	var nameInput = document.createElement("input");
	nameInput.name = "name";
	nameInput.type = "text";
	nameInput.id = 'editNameInput';
	nameInput.value = objName;
	nameInput.placeholder = 'Enter Name';

	var ageLabel = document.createElement("label");
	ageLabel.innerHTML = "Age";

	var ageInput = document.createElement("input");
	ageInput.name = "age";
	ageInput.type = "text";
	ageInput.id = 'editAgeInput';
	ageInput.value = objAge;
	ageInput.placeholder = "Enter Age";

	var submitBtn = document.createElement("button");
	submitBtn.innerText = "Submit";
	submitBtn.type='submit';
	submitBtn.id='editHeroBtn';

	var cancelBtn = document.createElement("button");
	cancelBtn.innerText = "Cancel";
	cancelBtn.type='button';
	cancelBtn.id='cancelHeroEditBtn';

	var div1 = document.createElement("div");
	var div2 = document.createElement("div");

	formElem.insertBefore(div1, formElem.firstChild);
	// div1.appendChild(nameLabel);
	div1.appendChild(nameInput);
	// div2.appendChild(ageLabel);
	div2.appendChild(ageInput);
	formElem.appendChild(div2);
	
	formElem.appendChild(submitBtn);
	formElem.appendChild(cancelBtn);

	infoDiv.innerHTML = "";
	infoDiv.appendChild(formElem);
	statusPTag.innerText = `Edit Hero with ID: ${objID}`;
}

function renderLoadByIDForm(){
	var formElem = document.createElement("form");
	var div1 = document.createElement("div");

	formElem.id = "loadByIDForm";
	formElem.method = "GET";

	var loadByIDLabel = document.createElement("label");
	loadByIDLabel.innerText = 'ID';

	var idInput = document.createElement("input");
	idInput.id ='loadByIDInput';
	idInput.name = "id";
	idInput.type= 'text';
	idInput.placeholder = "Type ID";

	var submitBtn = document.createElement("button");
	submitBtn.innerText = "Find";
	submitBtn.type='submit';
	submitBtn.id='loadByIDBtn';

	var cancelBtn = document.createElement("button");
	cancelBtn.innerText = "Cancel";
	cancelBtn.type='button';
	cancelBtn.id='cancelHeroByIDBtn';

	div1.appendChild(idInput);
	formElem.insertBefore(div1, formElem.firstChild);
	// formElem.insertBefore(loadByIDLabel, idInput);
	formElem.appendChild(submitBtn);
	formElem.appendChild(cancelBtn);

	infoDiv.appendChild(formElem);
	statusPTag.innerText = "Find Hero By ID";
}

function renderCreateForm(){
	
	var formElem = document.createElement("form");
	formElem.id = "heroForm";
	formElem.method = "POST";
	formElem.action = APIURL;

	var nameLabel = document.createElement("label");
	nameLabel.innerHTML = "Name";

	var nameInput = document.createElement("input");
	nameInput.name = "name";
	nameInput.type = "text";
	nameInput.minlength = 3;
	nameInput.id = 'nameInput';
	nameInput.placeholder = 'Enter Name';

	var ageLabel = document.createElement("label");
	ageLabel.innerHTML = "Age";

	var ageInput = document.createElement("input");
	ageInput.name = "age";
	ageInput.type = "text";
	ageInput.id = 'ageInput';
	ageInput.placeholder = "Enter Age";

	var submitBtn = document.createElement("button");
	submitBtn.innerText = "Submit";
	submitBtn.type='submit';
	submitBtn.id='createHeroBtn';

	var cancelBtn = document.createElement("button");
	cancelBtn.innerText = "Cancel";
	cancelBtn.type='button';
	cancelBtn.id='cancelHeroCreateBtn';

	var div1 = document.createElement("div");
	var div2 = document.createElement("div");

	formElem.insertBefore(div1, formElem.firstChild);
	// div1.appendChild(nameLabel);
	div1.appendChild(nameInput);
	// div2.appendChild(ageLabel);
	div2.appendChild(ageInput);
	formElem.appendChild(div2);
	
	formElem.appendChild(submitBtn);
	formElem.appendChild(cancelBtn);

	infoDiv.appendChild(formElem);
	statusPTag.innerText = "Create Hero";
}

function deleteObj(theiD){
	var deleteByIDAPIURL = `${APIURL}/${theiD}`;
	var xhr = new XMLHttpRequest();
	xhr.open('DELETE', deleteByIDAPIURL, true);
	xhr.onload = function(){
		loadAllData();
	}
	xhr.onerror = function(){
		statusPTag.innerText = "Connection Error";
	}
	xhr.send();
}

function unrenderLoadByIDForm(){
	statusPTag.innerText = "";
	var loadByIDForm = document.getElementById('loadByIDForm');
	loadByIDForm.remove();
	loadAllData();
}

function unrenderCreateForm(){
	statusPTag.innerText = "";
	var heroForm = document.getElementById('heroForm');
	heroForm.remove();
	loadAllData();
}

function clearData(){
	infoDiv.innerHTML = "";
	statusPTag.innerText = "Cleared Screen"
}