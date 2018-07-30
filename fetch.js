var card_data = data;
function selectCreatureCategory(creatureAttribute){
	for( let i = 0; i < card_data.length; i++)
	{
		if(card_data[i].attribute == creatureAttribute && card_data[i].type == "Creature")
		{
			console.log(card_data[i]);
		}
	}
}
function selectItemOrSpellCategory(type){
	for( let i = 0; i < card_data.length; i++)
	{
		if(card_data[i].type == type)
		{
			console.log(card_data[i]);
		}
	}
}