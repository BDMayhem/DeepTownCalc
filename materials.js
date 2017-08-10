const materials  = [
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
		name: "sapphire",
		source: "mining"
	}, {
		name: "amethyst",
		source: "mining"
	}, {
		name: "titaniumOre",
		source: "mining"
	}, {
		name: "alexandrite",
		source: "mining"
	}, {
		name: "uranium",
		source: "mining"
	}, {
		name: "uraniumRod",
		source: "Enrichment",
		time: "600",
		toMake: [
			{
				thing: "uranium",
				quantity: "100"
			}, {
				thing: "sodium",
				quantity: "50"
			}
		]
	}, {
		name: "polishedAlexandrite",
		source: "jewelCrafting",
		time: "60",
		toMake: [
			{
				thing: "alexandrite",
				quantity: "5"
			}
		]
	}, {
		name: "titanium",
		source: "chemistry",
		time: "20",
		batch: "50",
		toMake: [
			{
				thing: "sulfuricAcid",
				quantity: "1"
			}, {
				thing: "titaniumOre",
				quantity: "100"
			}
		]
	}, {
		name: "diethylEther",
		source: "chemistry",
		time: "60",
		toMake: [
			{
				thing: "sulfuricAcid",
				quantity: "1"
			}, {
				thing: "ethanol",
				quantity: "1"
			}
		]
	}, {
		name: "gunpowder",
		source: "chemistry",
		time: "120",
		batch: "20",
		toMake: [
			{
				thing: "diethylEther",
				quantity: "1"
			}, {
				thing: "sulfuricAcid",
				quantity: "2"
			}, {
				thing: "wood",
				quantity: "2"
			}
		]
	}, {
		name: "gear",
		source: "crafting",
		time: "80",
		toMake: [
			{
				thing: "diamondCutter",
				quantity: "1"
			}, {
				thing: "titaniumBar",
				quantity: "1"
			}
		]
	}, {
		name: "bomb",
		source: "crafting",
		time: "120",
		toMake: [
			{
				thing: "titaniumBar",
				quantity: "5"
			}, {
				thing: "gunpowder",
				quantity: "10"
			}
		]
	}, {
		name: "titaniumBar",
		source: "smelting",
		time: "60",
		toMake: [
			{
				thing: "titanium",
				quantity: "5"
			}
		]
	}, {
		name: "copperBar",
		source: "smelting",
		time: "10",
		toMake: [
			{
				thing: "copper",
				quantity: "5"
			}
		]
	}, {
		name: "ironBar",
		source: "smelting",
		time: "15",
		toMake: [
			{
				thing: "iron",
				quantity: "5"
			}
		]
	}, {
		name: "glass",
		source: "smelting",
		time: "60",
		toMake: [
			{
				thing: "silicon",
				quantity: "2"
			}
		]
	}, {
		name: "aluminumBar",
		source: "smelting",
		time: "15",
		toMake: [
			{
				thing: "aluminum",
				quantity: "5"
			}
		]
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
		toMake: [
			{
				thing: "silver",
				quantity: "5"
			}
		]
	}, {
		name: "charcoal",
		source: "smelting",
		time: "60",
		batch: "50",
		toMake: [
			{
				thing: "wood",
				quantity: "1"
			}
		]
	}, {
		name: "goldBar",
		source: "smelting",
		time: "60",
		toMake: [
			{
				thing: "gold",
				quantity: "5"
			}
		]
	}, {
		name: "steelPlate",
		source: "smelting",
		time: "120",
		toMake: [
			{
				thing: "steelBar",
				quantity: "5"
			}
		]
	}, {
		name: "graphite",
		source: "crafting",
		time: "5",
		value: "15",
		toMake: [
			{
				thing: "coal",
				quantity: "5"
			}
		]
	}, {
		name: "copperNail",
		source: "crafting",
		time: "20",
		batch: "10",
		value: "10",
		toMake: [
			{
				thing: "copperBar",
				quantity: "1"
			}
		]
	}, {
		name: "wire",
		source: "crafting",
		time: "30",
		batch: "5",
		value: "15",
		toMake: [
			{
				thing: "copperBar",
				quantity: "1"
			}
		]
	}, {
		name: "battery",
		source: "crafting",
		time: "120",
		value: "200",
		toMake: [
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
		toMake: [
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
		toMake: [
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
		toMake: [
			{
				thing: "glass",
				quantity: "1"
			}
		]
	}, {
		name: "amberCharger",
		source: "crafting",
		time: "5",
		value: "4",
		toMake: [
			{
				thing: "amber",
				quantity: "1"
			}
		]
	}, {
		name: "aluminumBottle",
		source: "crafting",
		time: "30",
		value: "55",
		toMake: [
			{
				thing: "aluminumBar",
				quantity: "1"
			}
		]
	}, {
		name: "amberInsulation",
		source: "crafting",
		time: "20",
		value: "125",
		toMake: [
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
		toMake: [
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
		batch: "5",
		value: "400",
		toMake: [
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
		toMake: [
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
		time: "1800",
		value: "17000",
		toMake: [
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
		time: "1200",
		value: "27000",
		toMake: [
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
		toMake: [
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
		toMake: [
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
	}, {
		name: "silicon",
		source: "chemicalMining",
		time: "600",
		batch: "5",
		value: "100"
	}, {
		name: "sulfur",
		source: "chemicalMining",
		time: "600",
		batch: "5",
		value: "100"
	}, {
		name: "sodium",
		source: "chemicalMining",
		time: "600",
		batch: "5",
		value: "100"
	}, {
		name: "oil",
		source: "oilPumping",
		value: "21"
	}, {
		name: "water",
		source: "waterCollection",
		value: "5"
	}, {
		name: "wood",
		source: "greenhouse",
		time: "1800",
		batch: "10",
		value: "193",
		toMake: [
			{
				thing: "treeSeed",
				quantity: "1"
			}, {
				thing: "water",
				quantity: "10"
			}
		]
	}, {
		name: "liana",
		source: "greenhouse",
		time: "1800",
		toMake: [
			{
				thing: "lianaSeed",
				quantity: "1"
			}, {
				thing: "water",
				quantity: "20"
			}
		]
	}, {
		name: "grape",
		source: "greenhouse",
		time: "1800",
		batch: "2",
		toMake: [
			{
				thing: "grapeSeed",
				quantity: "1"
			}, {
				thing: "water",
				quantity: "15"
			}
		]
	}, {
		name: "treeSeed",
		source: "shop",
		value: "20"
	}, {
		name: "lianaSeed",
		source: "shop",
		value: "1000"
	}, {
		name: "grapeSeed",
		source: "shop",
		value: "1200"
	}, {
		name: "cleanWater",
		source: "chemistry",
		time: "600",
		value: "1200",
		toMake: [
			{
				thing: "water",
				quantity: "1"
			}, {
				thing: "flask",
				quantity: "1"
			}
		]
	}, {
		name: "rubber",
		source: "chemistry",
		time: "1800",
		value: "4000",
		batch: "2",
		toMake: [
			{
				thing: "liana",
				quantity: "1"
			}
		]
	}, {
		name: "sulfuricAcid",
		source: "chemistry",
		time: "1800",
		value: "3500",
		toMake: [
			{
				thing: "cleanWater",
				quantity: "1"
			}, {
				thing: "sulfur",
				quantity: "2"
			}
		]
	}, {
		name: "ethanol",
		source: "chemistry",
		time: "1800",
		value: "4200",
		toMake: [
			{
				thing: "aluminumBottle",
				quantity: "1"
			}, {
				thing: "grape",
				quantity: "2"
			}
		]
	}, {
		name: "refinedOil",
		source: "chemistry",
		time: "1800",
		value: "16500",
		toMake: [
			{
				thing: "flask",
				quantity: "1"
			}, {
				thing: "hydrogen",
				quantity: "10"
			}, {
				thing: "oil",
				quantity: "10"
			}
		]
	}, {
		name: "plastic",
		source: "chemistry",
		time: "1800",
		value: "220000",
		toMake: [
			{
				thing: "refinedOil",
				quantity: "1"
			}, {
				thing: "coal",
				quantity: "1000"
			}, {
				thing: "greenLaser",
				quantity: "200"
			}
		]
	}, {
		name: "hydrogen",
		source: "chemistry",
		time: "900",
		value: "400",
		batch: "2",
		byproduct: "oxygen",
		toMake: [
			{
				thing: "cleanWater",
				quantity: "1"
			}
		]
	}, {
		name: "oxygen",
		source: "hydrogen",
		value: "800"
	}, {
		name: "polishedAmber",
		source: "jewelCrafting",
		time: "30",
		value: "70",
		toMake: [
			{
				thing: "amber",
				quantity: "5"
			}
		]
	}, {
		name: "polishedEmerald",
		source: "jewelCrafting",
		time: "30",
		value: "160",
		toMake: [
			{
				thing: "emerald",
				quantity: "5"
			}
		]
	}, {
		name: "amberBracelet",
		source: "jewelCrafting",
		time: "120",
		value: "280",
		toMake: [
			{
				thing: "polishedAmber",
				quantity: "1"
			}, {
				thing: "silverBar",
				quantity: "1"
			}
		]
	}, {
		name: "emeraldRing",
		source: "jewelCrafting",
		time: "300",
		value: "450",
		toMake: [
			{
				thing: "polishedEmerald",
				quantity: "1"
			}, {
				thing: "goldBar",
				quantity: "1"
			}
		]
	}, {
		name: "polishedTopaz",
		source: "jewelCrafting",
		time: "60",
		value: "70",
		toMake: [
			{
				thing: "topaz",
				quantity: "5"
			}
		]
	}, {
		name: "polishedRuby",
		source: "jewelCrafting",
		time: "60",
		value: "75",
		toMake: [
			{
				thing: "ruby",
				quantity: "5"
			}
		]
	}, {
		name: "polishedDiamond",
		source: "jewelCrafting",
		time: "60",
		value: "90",
		toMake: [
			{
				thing: "diamond",
				quantity: "5"
			}
		]
	}, {
		name: "polishedSapphire",
		source: "jewelCrafting",
		time: "60",
		value: "80",
		toMake: [
			{
				thing: "sapphire",
				quantity: "5"
			}
		]
	}, {
		name: "polishedAmethyst",
		source: "jewelCrafting",
		time: "60",
		value: "90",
		toMake: [
			{
				thing: "amethyst",
				quantity: "5"
			}
		]
	}
];