// Getting the ID of the animal to be searched for

var animalIDParam = new URLSearchParams(window.location.search)
var animalID = animalIDParam.get('id');

// Searching for the animal and returning the relevant data

var animalName;
var animalSex;
var animalBreed;
var animalGeneralAge;
var animalPictures;
var animalDescription;

fetch('https://api.rescuegroups.org/http/v2.json', {
    method: 'POST',
    body: JSON.stringify({
        "apikey" : '',
            "objectType" : "animals",
            "objectAction" : "publicSearch",
            "search" : {
                "resultStart" : 0,
                "resultLimit" : 1,
                "resultSort" : "animalID",
                "resultOrder" : "asc",
                "calcFoundRows" : "Yes",
                "filters" : [{
                    "fieldName" : "animalID",
                    "operation" : "equals",
                    "criteria" : animalID
                }],
                "fields": ["animalName", "animalSex", "animalBreed", "animalGeneralAge", "animalPictures", "animalDescription"]
            }
    })
})
  .then(response => response.json())
  .then(data => {
      console.log(data.data)
    animalName = data.data[animalID].animalName;
    animalSex = data.data[animalID].animalSex;
    animalBreed = data.data[animalID].animalBreed;
    animalGeneralAge = data.data[animalID].animalGeneralAge;
    animalPictures = data.data[animalID].animalPictures;
    animalDescription = data.data[animalID].animalDescription;
    document.getElementById('animal-description').innerHTML = animalDescription
  })
