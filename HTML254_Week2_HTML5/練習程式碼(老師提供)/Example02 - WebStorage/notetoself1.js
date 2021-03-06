window.onload = init;

function init(){
	var addButton = document.getElementById("add_button");
	addButton.onclick = createStickey;
	var stickiesArray = getStickiesArray();

	for (var i=0; i < stickiesArray.length; i++){
		var key = stickiesArray[i];
		var value = localStorage[key];
		addStickyToDOM(key, value);
	}
}

var getStickiesArray = function (){
	var stickiesArray = localStorage.getItem("stickiesArray");
	if (!stickiesArray) {
		stickiesArray = [];
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	} else{
		stickiesArray = JSON.parse(stickiesArray);
	}
	return stickiesArray;
};

var createStickey = function () {
	var stickiesArray = getStickiesArray();
	var currentDate = new Date();
	var key = "sticky_" + currentDate.getTime();
	var value = document.getElementById("note_text").value;
	localStorage.setItem(key, value);
	stickiesArray.push(key);
	localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	
	addStickyToDOM(key, value);
};

var addStickyToDOM = function(key, value) {
	var stickies = document.getElementById("stickies");
	var sticky = document.createElement("li");
	sticky.setAttribute("id", key);
	var span = document.createElement("span");
	span.setAttribute("class","note");
	span.innerHTML = value;
	sticky.appendChild(span);
	stickies.appendChild(sticky);
	sticky.onclick = deleteStickey;
};

var deleteStickey = function (e) {
	var key = e.target.id;
	if (e.target.tagName.toLowerCase() == "span"){
		key = e.target.parentNode.id;
	}
	localStorage.removeItem(key);
	var stickiesArray = getStickiesArray();
	if (stickiesArray){
		for (var i = 0; i<stickiesArray.length; i++){
			if (key == stickiesArray[i])
				stickiesArray.splice(i,1);
		}
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
		removeStickyFromDOM(key);
	}
	
};

var removeStickyFromDOM = function (key){
	var item = document.getElementById(key);
	item.parentNode.removeChild(item);
};
