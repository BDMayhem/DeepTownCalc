var materials  = [
	{
		name: "coal",
		source: "mining"
	}, {
		name: "copper",
		source: "mining"
	}, {
		name: "amber",
		source: "mining"
	}, {
		name: "iron",
		source: "mining"
	}, {
		name: "aluminum",
		source: "mining"
	}, {
		name: "silver",
		source: "mining"
	}, {
		name: "gold",
		source: "mining"
	}, {
		name: "emerald",
		source: "mining"
	}, {
		name: "platinum",
		source: "mining"
	}, {
		name: "topaz",
		source: "mining"
	}, {
		name: "ruby",
		source: "mining"
	}, {
		name: "diamond",
		source: "mining"
	}, {
		name: "copperBar",
		source: "smelting",
		time: "10",
		toMake: 
			{
				thing: "copper",
				quantity: "5"
			}
	}, {
		name: "ironBar",
		source: "smelting",
		time: "15",
		toMake: 
			{
				thing: "iron",
				quantity: "5"
			}
	}, {
		name: "glass",
		source: "smelting",
		time: "60",
		toMake: 
			{
				thing: "silicon",
				quantity: "2"
			}
	}, {
		name: "aluminumBar",
		source: "smelting",
		time: "15",
		toMake:
			{
				thing: "aluminum",
				quantity: "5"
			}
	}, {
		name: "steelBar",
		source: "smelting",
		time: "45",
		toMake: [
			{
				thing: "ironBar",
				quantity: "1"
			},
			{
				thing: "graphite",
				quantity: "1"
			}
		]
	}, {
		name: "silverBar",
		source: "smelting",
		time: "60",
		toMake: 
			{
				thing: "silver",
				quantity: "5"
			}
	}, {
		name: "charcoal",
		source: "smelting",
		time: "60",
		batch: "50",
		toMake: 
			{
				thing: "wood",
				quantity: "1"
			}
	}, {
		name: "goldBar",
		source: "smelting",
		time: "60",
		toMake: 
			{
				thing: "gold",
				quantity: "5"
			}
	}, {
		name: "steelPlate",
		source: "smelting",
		time: "120",
		toMake: 
			{
				thing: "steelBar",
				quantity: "5"
			}
	}, {
		name: "graphite",
		source: "crafting",
		time: "5",
		value: "15",
		toMake: 
			{
				thing: "coal",
				quantity: "5"
			}
	}, {
		name: "copperNail",
		source: "crafting",
		time: "20",
		batch: "10",
		value: "10",
		toMake: 
			{
				thing: "copperBar",
				quantity: "1"
			}
	}, {
		name: "wire",
		source: "crafting",
		time: "30",
		batch: "5",
		value: "15",
		toMake: 
			{
				thing: "copperBar",
				quantity: "1"
			}
	}, {
		name: "battery",
		source: "crafting",
		time: "20",
		value: "200",
		toMake:[
			{
				thing: "amber",
				quantity: "1"
			}, {
				thing: "ironBar",
				quantity: "1"
			}, {
				thing: "copperBar",
				quantity: "5"
			}
		]
	}, {
		name: "circuit",
		source: "crafting",
		time: "180",
		value: "2070",
		toMake:[
			{
				thing: "ironBar",
				quantity: "10"
			}, {
				thing: "graphite",
				quantity: "50"
			}, {
				thing: "copperBar",
				quantity: "20"
			}
		]
	}, {
		name: "lamp",
		source: "crafting",
		time: "80",
		value: "760",
		toMake:[
			{
				thing: "wire",
				quantity: "10"
			}, {
				thing: "graphite",
				quantity: "20"
			}, {
				thing: "copperBar",
				quantity: "5"
			}
		]
	}, {
		name: "flask",
		source: "crafting",
		time: "60",
		value: "800",
		toMake: 
			{
				thing: "glass",
				quantity: "1"
			}
	}, {
		name: "amberCharger",
		source: "crafting",
		time: "5",
		value: "4",
		toMake: 
			{
				thing: "amber",
				quantity: "1"
			}
	}, {
		name: "aluminumBottle",
		source: "crafting",
		time: "30",
		batch: "2",
		value: "55",
		toMake: 
			{
				thing: "aluminumBar",
				quantity: "1"
			}
	}, {
		name: "amberInsulation",
		source: "crafting",
		time: "20",
		value: "125",
		toMake:[
			{
				thing: "amber",
				quantity: "10"
			}, {
				thing: "aluminumBottle",
				quantity: "1"
			}
		]
	}, {
		name: "insulatedWire",
		source: "crafting",
		time: "200",
		value: "750",
		toMake:[
			{
				thing: "wire",
				quantity: "1"
			}, {
				thing: "amberInsulation",
				quantity: "1"
			}
		]
	}, {
		name: "greenLaser",
		source: "crafting",
		time: "20",
		value: "400",
		toMake:[
			{
				thing: "polishedEmerald",
				quantity: "1"
			}, {
				thing: "insulatedWire",
				quantity: "1"
			}, {
				thing: "lamp",
				quantity: "1"
			}
		]
	}, {
		name: "diamondCutter",
		source: "crafting",
		time: "30",
		value: "5000",
		toMake:[
			{
				thing: "steelPlate",
				quantity: "1"
			}, {
				thing: "polishedDiamond",
				quantity: "5"
			}
		]
	}, {
		name: "motherboard",
		source: "crafting",
		time: "30",
		value: "17000",
		toMake:[
			{
				thing: "silicon",
				quantity: "3"
			}, {
				thing: "circuit",
				quantity: "3"
			}, {
				thing: "goldBar",
				quantity: "1"
			}
		]
	}, {
		name: "solidPropellant",
		source: "crafting",
		time: "20",
		value: "27000",
		toMake:[
			{
				thing: "rubber",
				quantity: "3"
			}, {
				thing: "aluminumBar",
				quantity: "10"
			}
		]
	}, {
		name: "accumulator",
		source: "crafting",
		time: "180",
		value: "9000",
		toMake:[
			{
				thing: "sodium",
				quantity: "20"
			}, {
				thing: "sulfur",
				quantity: "20"
			}
		]
	}, {
		name: "solarPanel",
		source: "crafting",
		time: "60",
		value: "69000",
		toMake:[
			{
				thing: "rubber",
				quantity: "1"
			}, {
				thing: "silicon",
				quantity: "10"
			}, {
				thing: "glass",
				quantity: "50"
			}
		]
	}
];