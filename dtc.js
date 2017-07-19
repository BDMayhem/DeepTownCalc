var sortingMines = [];
const otherSources = [
	"chemicalMining",
	"oilPumping",
	"waterCollection",
	"shop",
	"hydrogen"
];
var otherStuff = [];

//set up select options
var select = document.getElementById("what");
materials.forEach(function(e){
	var name = e.name;
	var el = document.createElement("option");
	el.textContent = name;
	el.value = name;
	select.appendChild(el);
	el.selected = "copperBar";
});

function makeThese(stuff, quant, availableMines, callback){
	recursionCount++;

	var material = materials.filter(function(e){
		return e.name === stuff;
	})[0];

	if (material.hasOwnProperty("batch")){
		quant = Math.ceil(quant / material.batch);
	};

	//deal with mined stuff
	if (material.source === "mining"){
		var toMine = material.name;
		console.log("We need to mine " + toMine);

		mines.forEach(function(e){
			//check if e has been added to sortingMines
			Array.prototype.contains = function(obj){
				var i = this.length;
				while (i--) {
					if (sortingMines[i] === obj) {
						return true;
					};
				};
				return false;
			};

			if (sortingMines.contains(e)) {
			//if so, check if it has the current toMine
				if (e.hasOwnProperty(toMine)){
				//if so, add howMuch values
					e.howMuch = parseFloat(e.howMuch) + parseFloat(e[toMine]);
					e.what = e.what, toMine;
				};
			//if not, push to sortingMines
			} else if (e.hasOwnProperty(toMine)) {
				e.howMuch = e[toMine];
				// e.what = toMine;
				sortingMines.push(e);
			}
		});
	};

	//deal with non-mined stuff
	if (otherSources.includes(material.source)){
		var batchQuant;
		if (material.batch){
			batchQuant = material.batch * quant;
		} else {
			batchQuant = quant;
		};

		var addingOther = {};
		addingOther.stuff = stuff;
		addingOther.quantity = batchQuant;

		console.log("We also need", batchQuant, stuff, "from", material.source);

		if (otherStuff.length === 0){
			otherStuff.push(addingOther);
		} else {
			var matchCounter = 0;
			for (var i = otherStuff.length - 1; i >= 0; i--){
				if (otherStuff[i].stuff === material.name){
					console.log("match", otherStuff[i].stuff, material.name);
					otherStuff[i].quantity = otherStuff[i].quantity + batchQuant;
					break;
				} else {
					matchCounter++;
					console.log(matchCounter, otherStuff.length)
					if (matchCounter === otherStuff.length){
						otherStuff.push(addingOther);
					}
				}
			}
		};
		console.log(otherStuff)
	};

	if (Array.isArray(material.toMake)){
		material.toMake.forEach(function(e){

			var q = e.quantity * quant;
			console.log("We need (from array) " + q, e.thing);

			makeThese(e.thing, q, availableMines);
		});
	} else if (material.hasOwnProperty("toMake")){

		var q = material.toMake.quantity * quant;
		console.log("We need " + q, material.toMake.thing);

		makeThese(material.toMake.thing, q, availableMines);
	};

	recursionCount--;
	if (recursionCount === 0){
		callback(availableMines);
	}
};

function displayResults (availableMines) {
	console.log("sort the mines")
	sortingMines.sort(function(a, b){
		return b.howMuch - a.howMuch;
	});

	console.log(sortingMines)
	
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

document.getElementById("submit-button").addEventListener("click", function(e){
	e.preventDefault();

	sortingMines = [];
	recursionCount = 0;

	document.getElementById("result").innerHTML = "";
	var what = document.getElementById("what").value;
	var howMany = document.getElementById("how-many").value;
	var howManyMines = document.getElementById("mines").value;
	makeThese(what, howMany, howManyMines, displayResults);
});