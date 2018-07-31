var card_data = data;
function addToBook(cardName)
{

}
function selectAll()
{
	var selectionArea = document.querySelector("div.cardSelectionArea");
	for( let i = 0; i < card_data.length; i++)
	{	
		
		var cardi = document.createElement('div')
		cardi.style.width = "76px";
		cardi.style.height = "97px";
		cardi.style.margin = "2px";
		if(card_data[i].type == "Creature" && card_data[i].rarity != "E")
		{
			var link = "./" + card_data[i].attribute.toLowerCase() + "/" + card_data[i].name.toLowerCase().replace(/[^a-z0-9+]+/gi, '') +".jpg";
			cardi.style.backgroundImage += 'url(' + link + ')';
			console.log(link);
		}
		if(card_data[i].type == "Creature" && card_data[i].rarity == "E")
		{
			var link = "./evo" + "/" + card_data[i].name.toLowerCase().replace(/[^a-z0-9+]+/gi, '') +".jpg";
			cardi.style.backgroundImage += 'url(' + link + ')';
			console.log(link);
		}
		else if(card_data[i].type == "Spell")
		{
			var link = "./spells/" + card_data[i].name.toLowerCase().replace(/[^a-z0-9+]+/gi, '') +".jpg";
			cardi.style.backgroundImage += 'url(' + link + ')';
		}
		else if(card_data[i].type == "Item")
		{
			var link = "./items/" + card_data[i].name.toLowerCase().replace(/[^a-z0-9+]+/gi, '') +".jpg";
			cardi.style.backgroundImage += 'url(' + link + ')';
		}

		cardi.style.backgroundSize = "cover";
		cardi.style.cssFloat = "left";
		//cardi.addEventListener("click",addToBook(card_data[i].name))
		selectionArea.appendChild(cardi);
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