var card_data = data;
function addToBook(cardName)
{
	var bookArea = document.querySelector(".editBookArea");
	var card = document.createElement('div')
	card.style.width = "180px";
	card.style.height = "45px";
	card.style.backgroundColor = "white";
	card.innerText = cardName;
	card.style.border = " solid black"; 
	bookArea.appendChild(card);
}
function selectAll()
{
	var selectionArea = document.querySelector(".cardSelectionArea");
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