var data = {
    "apikey" : 'bos596JH',
        "objectType" : "animals",
        "objectAction" : "publicSearch",
        "search" : {
            "resultStart" : 0,
            "resultLimit" : 8,
            "resultSort" : "animalID",
            "resultOrder" : "asc",
            "calcFoundRows" : "Yes",
            "filters" : {
                },
            "fields": ["animalID","animalAgeString", "animalGeneralAge", "animalBreed","animalDescriptionPlain","animalLocationCitystate","animalName","animalPrimaryBreed","animalSpecies","animalThumbnailUrl","animalUrl","animalPictures"]
        }
}

fetch('https://api.rescuegroups.org/http/v2.json', {
    method: 'POST',
    body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => console.log(data));