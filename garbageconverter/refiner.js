"use strict";

// global require, console

const fs = require("fs");

/* Loading the old data. */
const cardsAll = require("./cardsOld");

/* Converting the garbage NOT array into an actual array. */
const cardsList = [];
for (let key in cardsAll) {
    cardsList.push(cardsAll[key]);
}

/* Mapping all the cards into a list of JSON-likes. */
const cardsJSON = cardsList.map((cardData) => {
    const matches = cardData.name.match(/(\d*)\)\W+(.*)/);
    var rarity = "N"
    var type = ""
    var attribute = ""
    switch(cardData.rarelity)
    {
        case 1:
            rarity = "N";
            break;
        case 2:
            rarity = "S";
            break;
        case 3:
            rarity = "R";
            break;
        case 4:
            rarity = "E";
            break;
    }
    switch(cardData.type)
    {
        case 1:
            type = "Creature";
            break;
        case 2:
            type = "Item";
            break;
        case 3:
            type = "Spell";
            break;
        
    }
    switch(cardData.attribute)
    {
        case 1:
            attribute = "Neutral";
            break;
        case 2:
            attribute = "Fire";
            break;
        case 3:
            attribute = "Water";
            break;
        case 4:
            attribute = "Earth";
            break;
        case 5:
            attribute = "Air";
            break
    }
    return {
        legacyId: cardData.num,
        num: parseInt(matches[1]),
        name: matches[2],
        rarity: rarity,
        type: type,
        costValue: cardData.costValue,
        costOther: cardData.costOther,
        attribute: attribute,
        placeRestriction: cardData.placeRestriction,
        itemRestriction: cardData.itemRestriction,
        st: cardData.st,
        mhp: cardData.mhp,
        abilityText: cardData.abilityText
    };
});

/* Making an object mapping of the card number to its json-like. */
const cardsJSONMap = {};
cardsJSON.forEach(item => {
    cardsJSONMap[item.num + ""] = item;
});


/* Logging our list so we know it did it. */
console.log(cardsJSON);

/* Saving the json-like array and object-map as a JSON file. */
const jsonString = JSON.stringify(cardsJSON, null, 4);
fs.writeFileSync('card_data.json', jsonString, 'utf8');

const jsonMapString = JSON.stringify(cardsJSONMap, null, 4);
fs.writeFileSync('card_data_map.json', jsonMapString, 'utf8');