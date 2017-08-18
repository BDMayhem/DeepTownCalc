let sortingMines = [];
let needsList = [];
let itemArray = [];
let invArray = [];
let recursionCount = 0;
const noTime = ["mining", "shop", "waterCollection", "oilPumping"];

//set up select options
const select = document.getElementsByClassName("what");
for (let i = 0; i < select.length; i++){

	materials.sort(function(a, b){
		if (a.name > b.name){
			return 1;
		}
		if (a.name < b.name){
			return -1;
		}
		return 0;
	});

	materials.forEach(function(e){
		const name = e.name;
		const el = document.createElement("option");
		el.textContent = name;
		el.value = name;
		select[i].appendChild(el);
	});
}

materials.sort(function(a, b){
	if (a.source === b.source){
		return (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0;
	} else {
		return (a.source > b.source) ? 1 : -1;
	}
});

for (let i = 0; i < materials.length; i++){
	//source headings
	if (i === 0 || i > 0 && materials[i].source != materials[i - 1].source){
		document.getElementById("needs").insertAdjacentHTML("beforeend", "<h3 class='hidden center'><span class='mat' data-source='" + materials[i].source + "' />" + materials[i].source + "</h3>");
		document.getElementById("inventory").insertAdjacentHTML("beforeend", "<h3 class='hidden center'><span class='inv' data-source='" + materials[i].source + "' />" + materials[i].source + "</h3>");
	}

	//build inventory div
	const inv = '<li class="hidden"><label class="invLabel">' + materials[i].name + ' </label><input name="' + materials[i].name + '" type="number" min="0" class="inv" form="form" oninput="submitButton()"></li>';
	document.getElementById("inventory").insertAdjacentHTML("beforeend", inv);

	//materials list
	let mat = "";
	if (!noTime.includes(materials[i].source)){
		mat = '<li class="hidden" data-source="' + materials[i].source + '"><span class="quantity"></span> ' + materials[i].name + ' <span class="time mat" data-name="' + materials[i].name + '"></span>&nbsp;&nbsp;&nbsp;<span class="plus">+</span> [<span class="number"></span>] <span class="minus">-</span></li>';
	} else {
		mat = '<li class="hidden" data-source="' + materials[i].source + '"><span class="quantity"></span> ' + materials[i].name + ' <span class="time mat" data-name="' + materials[i].name + '"></span>&nbsp;&nbsp;&nbsp;<span class="plus hidden">+ [</span><span class="number hidden"></span><span class="minus hidden">] -</span></li>';
	}

	document.getElementById("needs").insertAdjacentHTML("beforeend", mat);

	//stations buttons
	const minus = document.getElementsByClassName("minus");
	const numbers = document.getElementsByClassName("number");
	const plus = document.getElementsByClassName("plus");
	let num = numbers[numbers.length - 1];


	if (!num.innerHTML) {
		num.innerHTML = 1;
	}

	minus[minus.length - 1].addEventListener("click", function(e){
		if (num.innerHTML > 1){
			num.innerHTML--;
			submitButton();
		}
	});

	plus[plus.length - 1].addEventListener("click", function(e){
		num.innerHTML++;
		submitButton();
	});
}

function submitButton(){
	sortingMines = [];
	needsList = [];
	itemArray = [];
	invArray = [];
	recursionCount = 0;

	const what = document.getElementsByClassName("what");
	const howMany = document.getElementsByClassName("how-many");
	const inventory = document.getElementsByClassName("inv");

	for (let i = 0; i < what.length; i++){
		const item = {};
		item.name = what[i].value;
		item.quantity = howMany[i].value;

		if (itemArray.length === 0){
			itemArray.push(item);
		} else {
			let matchCounter = 0;
			for (let j = itemArray.length -1; j >=0; j--){
				if (itemArray[j].name === item.name){
					itemArray[j].quantity = parseFloat(itemArray[j].quantity) + parseFloat(item.quantity);
					break;
				} else {
					matchCounter++;
					if (matchCounter === itemArray.length){
						itemArray.push(item);
					}
				}
			}
		}
	}

	const availableMines = document.getElementById("mines").value;
	const maxArea = document.getElementById("area").value;

	for (let i = 0; i < inventory.length; i++){
		inventory[i].parentNode.classList.add("hidden");
		const invItem = {};
		invItem.name = inventory[i].name;
		invItem.quantity = inventory[i].value; 
		if (inventory[i].value > 0){
			invArray.push(invItem);
		}
	}

	const matList = document.getElementsByClassName("mat");
	for (let i = 0; i < matList.length; i++){
		matList[i].parentNode.classList.add("hidden");
	}
	makeInputNeeds(availableMines, maxArea);
}

function makeInputNeeds(availableMines, maxArea){
	itemArray.forEach(function(e){
		makeThese(e.name, e.quantity);
	});

	findMines(maxArea, availableMines);
}

function makeThese(stuff, quant){
	//check the coal source slider
	if (stuff === "coal"){
		const coalRatio = document.getElementById("coal").innerHTML;
		const coalQuant = Math.ceil(quant * coalRatio / 100);	
		if (quant - coalQuant){
			makeThese("charcoal", Math.ceil(quant * (100-coalRatio) / 100));
		}
		quant = coalQuant;
	}

	invArray.forEach(function(inventoryItem){
		if(stuff === inventoryItem.name && inventoryItem.quantity > 0){
			let reduce = inventoryItem.quantity;
			inventoryItem.quantity -= quant;
			quant -= reduce;
			(quant < 0) ? 0 : quant;
		}
	});

	const material = materials.filter(function(e){
		return e.name === stuff;
	})[0];

	//build array of all needs

	//add stations to material for bottleneck use
	material.quantity = quant;
	const matStation = document.getElementsByClassName("mat");
	const matStat = Array.prototype.filter.call(matStation, function(e){
		return e.dataset.name === material.name;
	})[0];
	
	material.stations = matStat.nextElementSibling.nextElementSibling.innerHTML;

	//this is to calculate bottleneck
	if (!material.hasOwnProperty("time")){
		material.time = 0;
	}

	if (material.hasOwnProperty("batch")){
		material.batches = Math.ceil(quant / material.batch);
	} else {
		material.batches = quant;
	}

	if (quant > 0){
		if (needsList.length === 0){
			needsList.push(Object.assign({}, material));
		} else {
			let matchCounter = 0;
			for (let i = needsList.length - 1; i >= 0; i--){
				if (needsList[i].name === material.name){
					needsList[i].quantity = parseInt(needsList[i].quantity) + parseInt(quant);
					break;
				} else {
					matchCounter++;
					if (matchCounter === needsList.length){
						needsList.push(Object.assign({}, material));
					}
				}
			}
		}
	}
	
	//recurse if necessary
	let q;
	if (material.hasOwnProperty("toMake")){
		material.toMake.forEach(function(e){
			q = material.batches * e.quantity;
			makeThese(e.thing, q);
		});
	}
}

function findMines (maxArea, availableMines) {
	let minableSum = 0;
	let needSum = 0;
	let minableNeeds = 0;

	needsList.forEach(function(miningNeed){
		miningNeed.totalMinable = 0;
		if (miningNeed.source === "mining"){
			minableNeeds++;
			needSum += parseFloat(miningNeed.quantity);
	
			const toMine = miningNeed.name;
			mines.forEach(function(mine){
				if (maxArea - mine.area >= 0 && mine.hasOwnProperty(toMine)){
					if (sortingMines.length === 0){
						sortingMines.push(Object.assign({}, mine));
						sortingMines[sortingMines.length-1].howMuch = mine[toMine];

						miningNeed.totalMinable = parseFloat(miningNeed.totalMinable) + parseFloat(mine[toMine]);
						minableSum += parseFloat(mine[toMine]);

					} else {
						let found;
						let i;
						searchingMinesLoop:
						for (i = 0; i < sortingMines.length; i++){
							if (sortingMines[i].area === mine.area){
								found = true;
								break searchingMinesLoop;
							}
						}

						if (found){
							sortingMines[i].howMuch = parseFloat(sortingMines[i].howMuch) + parseFloat(mine[toMine]);
							miningNeed.totalMinable = parseFloat(miningNeed.totalMinable) + parseFloat(mine[toMine]);
							minableSum += parseFloat(mine[toMine]);

						} else {
							sortingMines.push(Object.assign({}, mine));
							sortingMines[sortingMines.length-1].howMuch = mine[toMine];
							miningNeed.totalMinable = parseFloat(miningNeed.totalMinable) + parseFloat(mine[toMine]);
							minableSum += parseFloat(mine[toMine]);
						}
					}
				}
			});
		}
	});
	miningAlgorithm(availableMines, minableSum, needSum, minableNeeds);
}

function miningAlgorithm(availableMines, minableSum, needSum, minableNeeds){
	calculateLoop:
	for (let i = 0; i < availableMines; i++){
		let weightedNeedSum = 0;
		needsList.forEach(function(miningNeed){
			if (miningNeed.source === "mining"){
				miningNeed.percentOfTotalMinable = miningNeed.totalMinable / minableSum;

				if (miningNeed.hasOwnProperty("runningSum")){
					miningNeed.weightedNeed = (parseFloat(miningNeed.quantity) / needSum * availableMines * 100) - parseFloat(miningNeed.runningSum);
				} else {
					miningNeed.weightedNeed = (parseFloat(miningNeed.quantity) / needSum * availableMines * 100);
				}

				if (miningNeed.weightedNeed < 0){
					miningNeed.weightedNeed = 0;
				}

				weightedNeedSum += parseFloat(miningNeed.weightedNeed);

			}
		});

		needsList.forEach(function(miningNeed){
			if (miningNeed.source === "mining"){
				miningNeed.percentofWeightedNeed = parseFloat(miningNeed.weightedNeed) / weightedNeedSum;
				miningNeed.priority = parseFloat(miningNeed.percentofWeightedNeed) / parseFloat(miningNeed.percentOfTotalMinable);
			} else {
				miningNeed.priority = 0;	
			}
		});

		needsList.sort(function(a, b){
			return b.priority - a.priority;
		});

		sortingMines.sort(function(a, b){
			return b.howMuch - a.howMuch;
		});

		//check to see that each mined material has at least one mine

		// check each minable need against sortingMines

		//if sortingMines doesn't have a mine to produce the need, make that the top priority
		if (i >= availableMines - minableNeeds){
			checkForOrphanNeeds:
			for (let j = 0; j < needsList.length; j++){
				if (needsList[j].source === "mining" && !needsList[j].hasOwnProperty("checked")){
					needsList[j].checked = true;
					let matchCounter = 0;
					checkAgainstMines:
					for (let k = 0; k < sortingMines.length; k++){
						if (sortingMines[k].hasOwnProperty(needsList[j].name) && sortingMines[k].hasOwnProperty("order")){
							break checkForOrphanNeeds;
						} else {
							matchCounter++;
							if (matchCounter === sortingMines.length){
								needsList.unshift(needsList[j]);
								needsList.splice([j+1], 1);
							}
						}
					}
				}
			}	
		}
		chooseMine(i);
	}
	const sortedMines = [];
	sortingMines.forEach(function(e){
		if(e.hasOwnProperty("order")){
			sortedMines.push(e);
		}
	});

	displayMines(sortedMines);
}

function chooseMine(orderIndex){
	getHighestPriority:
	for (let l = 0; l < needsList.length; l++){
		getMatchingMine:
		for (let m = 0; m < sortingMines.length; m++){
			if (sortingMines[m].hasOwnProperty(needsList[l].name) && sortingMines[m].howMuch > 0){
				sortingMines[m].order = orderIndex;
				sortingMines[m].howMuch = 0;
				needsList.forEach(function(miningNeed){
					if (miningNeed.source === "mining"){
						if (sortingMines[m].hasOwnProperty(miningNeed.name)){
							if (miningNeed.hasOwnProperty("runningSum")){
								miningNeed.runningSum += parseFloat(sortingMines[m][miningNeed.name]);
							} else {
								miningNeed.runningSum = parseFloat(sortingMines[m][miningNeed.name]);
							}
						}
					}
				});
				break getHighestPriority;
			}
		}
	}
}

const resultDiv = document.getElementById("result");
const sortedDiv = document.getElementById("sorted-by-area");

function displayMines (sortedMines) {
	let content;
	
	if (sortedMines.length === 0){
		resultDiv.innerHTML = "<p class='center'>No materials to mine</p>";
		sortedDiv.innerHTML = "<p class='center'>No materials to mine</p>";
	} else {
		//click list to display mines list sorted by priority
		sortedMines.sort(function(a, b){
			return a.order - b.order;
		});

		resultDiv.innerHTML = "<p>Click to sort mines by area</p>";
		sortedMines.forEach(function(e){
			content = "Mine at Area " + e.area;
			resultDiv.insertAdjacentHTML("beforeend", content + "<br>");
		});

		//click list to display mines list sorted by area
		sortedDiv.innerHTML = "<p>Click to sort mines by priority</p>";
		sortedMines.sort(function(a, b){
			return a.area - b.area;
		});

		sortedMines.forEach(function(e){
			content = "Mine at Area " + e.area;
			sortedDiv.insertAdjacentHTML("beforeend", content + "<br>");
		});
	}
	displayNeeds();
}

function displayNeeds(){
	//sort needsList by source, then by quantity
	needsList.sort(function(a, b){
		if (a.source === b.source){
			return (a.quantity < b.quantity) ? 1 : (a.quantity > b.quantity) ? -1 : 0;
		} else {
			return (a.source > b.source) ? -1 : 1;
		}
	});
	
	const matDiv = document.getElementsByClassName("mat");
	const invDiv = document.getElementsByClassName("inv");

	
	for (let i = 0; i < needsList.length; i++){
		for (let j = 0; j < matDiv.length; j++){
			if (needsList[i].name === matDiv[j].dataset.name){
				
				const bottleneck = Math.max.apply(Math, needsList.map(function(e){
					return Math.ceil(parseInt(e.batches) * parseInt(e.time) / e.stations);
				}));

				const qu = Math.ceil(needsList[i].quantity / needsList[i].stations).toLocaleString("en-us");
				const st = needsList[i].name;
				
				matDiv[j].classList.remove("bottleneck");
				matDiv[j].parentNode.classList.remove("hidden");
				invDiv[j].parentNode.classList.remove("hidden");
				matDiv[j].previousElementSibling.innerHTML = qu + "&nbsp;";
				invDiv[j].previousElementSibling.innerHTML = st + "&nbsp;";

				if (needsList[i].quantity > 0){
					const time = [0,0,0,0];
					let ti;
					let timeStr = "";
					
					if(!noTime.includes(needsList[i].source)){
						
						ti = Math.ceil(needsList[i].time / needsList[i].stations * needsList[i].batches);
						console.log(needsList[i].name, ti, bottleneck)
						if (ti === bottleneck){
							matDiv[j].classList.add("bottleneck");
						}

						if (ti < needsList[i].time) {
							ti = needsList[i].time;
						}
						
						if (ti >= 86400){
							time[0] = Math.floor(ti/86400);
							ti -= time[0] * 86400;
						}
						if (ti >= 3600){
							time[1] = Math.floor(ti/3600);
							ti -= time[1] * 3600;
						}
						if (ti >= 60){
							time[2] = Math.floor(ti/60);
							ti -= time[2] * 60;
						}
						time[3] = ti;
						
						time.forEach(function(value, index, time){
							if (value === 0){
								time[index] = "00";
							}
						});
						
						if (time[0] > 0){
							timeStr = "&nbsp;- " + time[0] + ":" + time[1] + ":" + time[2] + ":" + time[3];
						} else  if (time[1] > 0){
							timeStr = "&nbsp;- " + time[1] + ":" + time[2] + ":" + time[3];
						} else {
							timeStr = "&nbsp;- " + time[2] + ":" + time[3];
						}
					}
					matDiv[j].innerHTML = timeStr;
				}
				
			}
			if (matDiv[j].dataset.source === needsList[i].source){
				matDiv[j].parentNode.classList.remove("hidden");
				invDiv[j].parentNode.classList.remove("hidden");
			}
		}
	}
}

document.querySelector(".more").addEventListener("click", addForm);

function addForm(){
	if (document.querySelectorAll(".item-needs").length > 1){
		document.querySelector(".item-needs").removeChild(document.querySelector(".delete-button"));
	}

	//clone the form
	const parentForm = document.getElementById("form");
	const item = document.querySelector(".item-needs");
	const itemClone = item.cloneNode(true);
	let last = document.querySelectorAll(".item-needs")[document.querySelectorAll(".item-needs").length-1];
	parentForm.insertBefore(itemClone, last.nextSibling);
	last = document.querySelectorAll(".item-needs")[document.querySelectorAll(".item-needs").length-1];
	
	addDeleteButton(item);
	addDeleteButton(last);
	submitButton();
}

function addDeleteButton(where){
	const deleteButton = document.createElement("button");
	deleteButton.innerHTML = "X";
	deleteButton.type = "button";
	deleteButton.classList.add("delete-button");
	where.appendChild(deleteButton);

	//tell delete button which div to delete
	deleteButton.addEventListener("click", function(e){
		where.parentNode.removeChild(where);
		//delete button from first form
		if (document.querySelectorAll(".item-needs").length === 1){
			document.querySelector(".item-needs").removeChild(document.querySelector(".delete-button"));
		}
		submitButton();
	});
}

document.querySelector("#mine-results").addEventListener("click", toggleMines);

function toggleMines(e){
	resultDiv.classList.toggle("hidden");
	sortedDiv.classList.toggle("hidden");
}

function showValue(newValue) {
	document.getElementById("coal").innerHTML=100 - newValue;
	document.getElementById("charcoal").innerHTML=newValue;
	submitButton();
}

document.getElementById("show-all").addEventListener("click", showAll);

function showAll(){
	Array.prototype.map.call(document.getElementsByClassName("inv"), function(e){
		e.parentNode.classList.remove("hidden");
	});

	document.getElementById("show-all").classList.add("hidden");
	document.querySelector("#hide").classList.remove("hidden");

}

document.getElementById("hide").addEventListener("click", hide);

function hide(){
	document.getElementById("show-all").classList.remove("hidden");
	document.getElementById("hide").classList.add("hidden");
	submitButton();
}