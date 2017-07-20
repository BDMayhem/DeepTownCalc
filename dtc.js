var sortingMines = [];
var needsList = [];
var recursionCount = 0;
var noTime = ["mining", "shop", "waterCollection"];

//set up select options
var select = document.getElementById("what");
materials.forEach(function(e){
	var name = e.name;
	var el = document.createElement("option");
	el.textContent = name;
	el.value = name;
	select.appendChild(el);
});

function makeThese(stuff, quant, availableMines, callback){
	recursionCount++;

	var material = materials.filter(function(e){
		return e.name === stuff;
	})[0];

	//build array of all needs
	var addingNeeds = {};
	addingNeeds.stuff = stuff;
	addingNeeds.quantity = quant;
	addingNeeds.source = material.source;
	if (!noTime.includes(material.source)){
		if (material.hasOwnProperty("batch")){
			addingNeeds.time = material.time / material.batch;
		} else {
			addingNeeds.time = material.time;
		};
	};

	console.log("We also need", quant, stuff, "from", material.source);

	if (needsList.length === 0){
		needsList.push(addingNeeds);
	} else {
		var matchCounter = 0;
		for (var i = needsList.length - 1; i >= 0; i--){
			if (needsList[i].stuff === material.name){
				console.log("match", needsList[i].stuff, material.name);
				needsList[i].quantity = needsList[i].quantity + quant;
				break;
			} else {
				matchCounter++;
				if (matchCounter === needsList.length){
					needsList.push(addingNeeds);
				}
			}
		}
	};

	//recurse if necessary
	var q;
	if (Array.isArray(material.toMake)){
		material.toMake.forEach(function(e){

			q = e.quantity * quant;
			console.log("We need (from array) " + q, e.thing);

			makeThese(e.thing, q, availableMines);
		});
	} else if (material.hasOwnProperty("toMake")){

		q = material.toMake.quantity * quant;
		console.log("We need " + q, material.toMake.thing);

		makeThese(material.toMake.thing, q, availableMines);
	};

	recursionCount--;
	if (recursionCount === 0){
		callback(availableMines);
	}
};

function findMines (availableMines) {
	needsList.forEach(function(miningNeed){
		console.log("I need to mine this stuff: ", miningNeed.stuff)
		if (miningNeed.source === "mining"){
			var toMine = miningNeed.stuff;
			mines.forEach(function(mine){
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
				}
			});
		};
	});
	displayResults(availableMines);
};


function displayResults (availableMines) {
	if (sortingMines.length === 0){
		document.getElementById("result").insertAdjacentHTML("beforeend", "No regular mines needed for this material");
	} else {
		sortingMines.sort(function(a, b){
			return b.howMuch - a.howMuch;
		});

		sortingMines.forEach(function(e){
			if (availableMines > 0){
				console.log("Mine at area " + e.area);
				var resultDiv = document.getElementById("result");
				var content = "Mine at Area " + e.area;
				resultDiv.insertAdjacentHTML("beforeend", content + "<br>");
				availableMines--;
			};
		});
	};

	for (var i = 0; i < needsList.length; i++){
		if (i === 0) {
		} else {
			var qu = needsList[i].quantity.toLocaleString("en-us");
			var st = needsList[i].stuff;
			var so = needsList[i].source;
			var content = qu + " " + st + " via " + so;
			var time = [0,0,0,0];

			var ti = needsList[i].time * needsList[i].quantity;
			if (ti > 86400){
				time[0] = Math.floor(ti/86400);
				ti -= time[0] * 86400;
			};
			if (ti > 3600){
				time[1] = Math.floor(ti/3600);
				ti -= time[1] * 3600;
			};
			if (ti > 60){
				time[2] = Math.floor(ti/60);
				ti -= time[2] * 60;
			};
			time[3] = ti;

			var timeStr = "";
			if (time[0] > 0){
				timeStr = time[0] + ":" + time[1] + ":" + time[2] + ":" + time[3];
			} else  if (time[1] > 0){
				timeStr = time[1] + ":" + time[2] + ":" + time[3];
			} else if (time[2] > 0){
				timeStr = time[2] + ":" + time[3];
			};

			if (needsList[i].time){
				content += ", which will take " + timeStr;
			}
			document.getElementById("needs").insertAdjacentHTML("beforeend", content + "<br>");
		}
	}
};

document.getElementById("submit-button").addEventListener("click", function(e){
	e.preventDefault();

	sortingMines = [];
	needsList = [];
	recursionCount = 0;

	document.getElementById("result").innerHTML = "<p>Mine your materials here:</p>";
	document.getElementById("needs").innerHTML = "<p>You will also need:</p>";
	var what = document.getElementById("what").value;
	var howMany = document.getElementById("how-many").value;
	var howManyMines = document.getElementById("mines").value;
	makeThese(what, howMany, howManyMines, findMines);
});