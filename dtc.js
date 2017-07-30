var sortingMines = [];
var needsList = [];
var recursionCount = 0;
var noTime = ["mining", "shop", "waterCollection"];

//set up select options
var select = document.getElementById("what");
materials.sort(function(a, b){
	if (a.name > b.name){
		return 1;
	};
	if (a.name < b.name){
		return -1;
	};
	return 0;
});

materials.forEach(function(e){
	var name = e.name;
	var el = document.createElement("option");
	el.textContent = name;
	el.value = name;
	select.appendChild(el);
});

function makeThese(stuff, quant, availableMines, maxArea){
	recursionCount++;

	var material = materials.filter(function(e){
		return e.name === stuff;
	})[0];

	//build array of all needs
	material.quantity = quant;
	if (needsList.length === 0){
		needsList.push(material);
	} else {
		var matchCounter = 0;
		for (var i = needsList.length - 1; i >= 0; i--){
			if (needsList[i].name === material.name){
				needsList[i].quantity = needsList[i].quantity + quant;
				break;
			} else {
				matchCounter++;
				if (matchCounter === needsList.length){
					needsList.push(material);
				}
			}
		}
	};

	//recurse if necessary
	var q;
	if (material.hasOwnProperty("toMake")){
		//make sure we're working with whole batches
		if (material.hasOwnProperty("batch")){
			material.toMake.forEach(function(e){
				if (quant % material.batch === 0){
					q = quant * e.quantity / material.batch;
					console.log("full batch", material.name)
				} else {
					var wholeBatches = Math.floor(quant / material.batch);
					console.log("partial batch", material.name, wholeBatches)
					q = ((wholeBatches + 1) * e.quantity);
					console.log(q)
				};

				makeThese(e.thing, q, availableMines, maxArea);

			});
		} else {
			material.toMake.forEach(function(e){
				q = e.quantity * quant;
				makeThese(e.thing, q, availableMines, maxArea);
			});
		}
	};

	recursionCount--;
	if (recursionCount === 0){
		findMines(maxArea, availableMines);
	}
};

function findMines (maxArea, availableMines) {
	needsList.forEach(function(miningNeed){
		if (miningNeed.source === "mining"){
			var toMine = miningNeed.name;
			mines.forEach(function(mine){
				if (maxArea - mine.area >= 0){
					//check if mine has been added to sortingMines
					Array.prototype.contains = function(obj){
						var i = this.length;
						while (i--) {
							if (sortingMines[i] === obj) {
								return true;
							};
						};
						return false;
					};

					if (sortingMines.contains(mine)) {
					//if so, check if it has the current toMine
						if (mine.hasOwnProperty(toMine)){
						//if so, add howMuch values
							mine.howMuch = parseFloat(mine.howMuch) + parseFloat(mine[toMine]);
							// mine.what = mine.what, toMine;
						};
					//if not, push to sortingMines
					} else if (mine.hasOwnProperty(toMine)) {
						mine.howMuch = mine[toMine];
						// mine.what = toMine;
						sortingMines.push(mine);
					};
				};
			});
		};
	});
	displayResults(availableMines);
};

var resultDiv = document.getElementById("result");
var sortedDiv = document.getElementById("sorted-by-area");
var content;

function displayResults (availableMines) {
	if (sortingMines.length === 0){
		document.getElementById("result").innerHTML = "<p>Mining isn't going to help you with this</p>";
		document.getElementById("sorted-by-area").innerHTML = "<p>Mining isn't going to help you with this</p>";
	} else {
		sortingMines.sort(function(a, b){
			return b.howMuch - a.howMuch;
		});

		//click list to display mines list sorted by priority
		document.getElementById("result").innerHTML = "<p>Click to sort mines by priority</p>";
		var toRemove = sortingMines.length - availableMines;
		sortingMines.splice(availableMines, toRemove);
		sortingMines.forEach(function(e){
			content = "Mine at Area " + e.area;
			resultDiv.insertAdjacentHTML("beforeend", content + "<br>");
		});

		//click list to display mines list sorted by area
		document.getElementById("sorted-by-area").innerHTML = "<p>Click to sort mines by area</p>";
		sortingMines.sort(function(a, b){
			return a.area - b.area;
		});
		sortingMines.forEach(function(e){
			content = "Mine at Area " + e.area;
			sortedDiv.insertAdjacentHTML("beforeend", content + "<br>");
		})
	};

	document.getElementById("needs").innerHTML = "<p>You will need:</p>";
	for (var i = 0; i < needsList.length; i++){
		var qu = needsList[i].quantity.toLocaleString("en-us");
		var st = needsList[i].name;
		var so = needsList[i].source;
		var content = qu + " " + st + " via " + so;
		var time = [0,0,0,0];

		if (needsList[i].hasOwnProperty("batch")){
			var ti = needsList[i].time * needsList[i].quantity / needsList[i].batch;
		} else {
			var ti = needsList[i].time * needsList[i].quantity;
		}

		if (ti >= 86400){
			time[0] = Math.floor(ti/86400);
			ti -= time[0] * 86400;
		};
		if (ti >= 3600){
			time[1] = Math.floor(ti/3600);
			ti -= time[1] * 3600;
		};
		if (ti >= 60){
			time[2] = Math.floor(ti/60);
			ti -= time[2] * 60;
		};
		time[3] = ti;

		time.forEach(function(value, index, time){
			if (value === 0){
				time[index] = "00";
			};
		});

		var timeStr = "";
		if (time[0] > 0){
			timeStr = time[0] + ":" + time[1] + ":" + time[2] + ":" + time[3];
		} else  if (time[1] > 0){
			timeStr = time[1] + ":" + time[2] + ":" + time[3];
		} else {
			timeStr = time[2] + ":" + time[3];
		};

		if (needsList[i].time){
			content += ", which will take " + timeStr;
		}
		document.getElementById("needs").insertAdjacentHTML("beforeend", content + "<br>");
	}
};

document.getElementById("submit-button").addEventListener("click", function(e){
	e.preventDefault();

	sortingMines = [];
	needsList = [];
	recursionCount = 0;

	document.getElementById("needs").innerHTML = "";
	var what = document.getElementById("what").value;
	var howMany = document.getElementById("how-many").value;
	var howManyMines = document.getElementById("mines").value;
	var maxArea = document.getElementById("area").value;
	makeThese(what, howMany, howManyMines, maxArea);
});

document.querySelector(".mine-results").addEventListener("click", toggleMines)
function toggleMines(e){
	e.preventDefault();
	resultDiv.classList.toggle("hidden");
	sortedDiv.classList.toggle("hidden");
};
