var card_data = [];
var slot_map = new Map();
var bookCounter = 0;

function addToBook(cardName)
{
	if(!slot_map.has(cardName) && bookCounter < 50)
	{
		slot_map.set(cardName, 1);
		const bookArea = document.querySelector(".editBookArea");

		const wrapper = document.createElement('div');
		wrapper.setAttribute("class", "flex-container");
		wrapper.setAttribute("id", cardName);
		const slot = document.createElement('div');
		slot.classList.add("name");
		slot.innerText = cardName;

		const slotNum = document.createElement('div');
		slotNum.classList.add("count");
		slotNum.innerText = slot_map.get(cardName);

		wrapper.appendChild(slot);
		wrapper.appendChild(slotNum);
	
		wrapper.addEventListener("click", function(){removeFromBook(cardName)},false);
		bookArea.appendChild(wrapper);
		bookCounter++;
	}
	else if( slot_map.get(cardName) < 4 && bookCounter < 50)
	{
		editSlotCount(cardName, "add");
		bookCounter++;
	}
	
	console.log(bookCounter);
}

function removeFromBook(cardName)
{
	if(slot_map.get(cardName) == 1)
	{
		const bookArea = document.querySelector(".editBookArea");
		const slotWrapper = document.getElementById(cardName);
		bookArea.removeChild(slotWrapper);
		//slotWrapper = null;
		slot_map.delete(cardName);
	}
	else
	{
		editSlotCount(cardName, "subtract");
	}
	bookCounter--;
}
function editSlotCount(cardName, addOrSubtract)
{
	var countElement = document.getElementById(cardName).getElementsByClassName("count")[0];
	var updatedCount = parseInt(countElement.innerText);
	if(addOrSubtract == "add")
	{
		updatedCount++;
	}
	else
	{
		updatedCount--;
	}
	countElement.innerText = updatedCount;
	slot_map.set(cardName, updatedCount);
}
function selectAll()
{
	card_data = data;
	const selectionArea = document.querySelector(".cardSelectionArea");
	for( let i = 0; i < card_data.length; i++)
	{	
	const card = document.createElement('div');
	card.classList.add("card");
	const cardName = card_data[i].name.toLowerCase().replace(/[^a-z0-9+]+/gi, '');
	let imageLocation = "";

	if (card_data[i].type === "Creature") 
	{
	    if (card_data[i].rarity === "E") 
	    {
	        imageLocation = "evo";
	    } 
	    else 
	    {
	        imageLocation = card_data[i].attribute.toLowerCase();
	    }
	} 
	else if (card_data[i].type === "Spell") 
	{
	    imageLocation = "spells";
	} 
	else if (card_data[i].type === "Item") 
	{
	    imageLocation = "items";
	}
	const link = "./" + imageLocation + "/" + cardName + ".jpg";
	card.style.backgroundImage = 'url(' + link + ')';

	card.addEventListener("click", function(){addToBook(card_data[i].name)},false);
	selectionArea.appendChild(card);
	}
}
function selectCreatureCategory(creatureAttribute)
{
	card_data = []
	const selectionArea = document.querySelector(".cardSelectionArea");
	selectionArea.innerHTML = '';
	for( let i = 0; i < data.length; i++)
	{
		if(data[i].attribute == creatureAttribute && data[i].type == "Creature")
		{
			const card = document.createElement('div');
			card.classList.add("card");
			const cardName = data[i].name.toLowerCase().replace(/[^a-z0-9+]+/gi, '');
			let imageLocation = "";

			const link = "./" + data[i].attribute.toLowerCase() + "/" + cardName + ".jpg";
			card.style.backgroundImage = 'url(' + link + ')';

			card.addEventListener("click", function(){addToBook(data[i].name)},false);
			selectionArea.appendChild(card);
			card_data.push(card);
		}
	}


}
function selectCreatureItemOrSpellCategory(type)
{
	for( let i = 0; i < card_data.length; i++)
	{
		if(card_data[i].type == type)
		{
			console.log(card_data[i]);
		}
	}
}