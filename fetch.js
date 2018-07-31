var card_data = data;
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

		bookArea.appendChild(wrapper);
		bookCounter++;
	}
	else if( slot_map.get(cardName) < 4 && bookCounter < 50)
	{
		var countElement = document.getElementById(cardName).getElementsByClassName("count")[0];
		var updatedCount = parseInt(countElement.innerText);
		updatedCount++;
		countElement.innerText = updatedCount;
		slot_map.set(cardName, updatedCount);
		console.log(slot_map.get(cardName));
		bookCounter++;
	}
}
function selectAll()
{
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
	    imageLocation = "./spells/";
	} 
	else if (card_data[i].type === "Item") 
	{
	    imageLocation = "./items/";
	}
	const link = "./" + imageLocation + "/" + cardName + ".jpg";
	card.style.backgroundImage = 'url(' + link + ')';

	card.addEventListener("click", function(){addToBook(card_data[i].name)},false);
	selectionArea.appendChild(card);
	}
}
function selectCreatureCategory(creatureAttribute)
{
	for( let i = 0; i < card_data.length; i++)
	{
		if(card_data[i].attribute == creatureAttribute && card_data[i].type == "Creature")
		{
			console.log(card_data[i]);
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