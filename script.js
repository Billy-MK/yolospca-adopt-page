var species = "";
var breed = "";
var age = "";
var sex = "";

function selectSpecies(selectedSpecies) {
    species = {
        "fieldName" : "animalSpecies",
        "operation" : "equals",
        "criteria" : selectedSpecies
    };
    filters.push(species)
    search();
}

function selectAge(selectedAge) {
    age = {
        "fieldName" : "animalAge",
        "operation" : "equals",
        "criteria" : selectedAge
    };
    filters.push(age)
    search();
}

function selectBreed(selectedBreed) {
    breed = {
        "fieldName" : "animalBreed",
        "operation" : "equals",
        "criteria" : selectedBreed
    };
    filters.push(breed)
    search();
}

function selectSex() {
    sex = {
        "fieldName" : "animalSex",
        "operation" : "equals",
        "criteria" : "male"
    };
    filters.push(sex)
    search();
}


function search() {
    var filters = [
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
        ]

    fetch('https://api.rescuegroups.org/http/v2.json', {
    method: 'POST',
    body: JSON.stringify({
        "apikey" : '',
            "objectType" : "animals",
            "objectAction" : "publicSearch",
            "search" : {
                "resultStart" : 0,
                "resultLimit" : 15,
                "resultSort" : "animalID",
                "resultOrder" : "asc",
                "calcFoundRows" : "Yes",
                "filters" : filters,
                "fields": ["animalName", "animalSex"]
            }
    })
})
  .then(response => response.json())
  .then(data => {
      for (const key in data.data) {
          console.log(data.data[key])
      }
      document.getElementById("results").textContent = JSON.stringify(data.data)
  });
}

search();