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
            "filters" : [
                {
                    "fieldName" : "animalOrgID",
                    "operation" : "equals",
                    "criteria" : "1742"
                },
                {
                "fieldName" : "animalStatus",
                "operation" : "equals",
                "criteria" : "available"
                }
            ],
            "fields": ["animalID","animalAgeString", "animalGeneralAge", "animalBreed","animalDescriptionPlain","animalName","animalPrimaryBreed","animalSpecies","animalThumbnailUrl","animalUrl","animalPictures"]
        }
}

fetch('https://api.rescuegroups.org/http/v2.json', {
    method: 'POST',
    body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => {
      for (const key in data.data) {
          console.log(data.data[key])
      }
  });

