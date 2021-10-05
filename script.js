// Filters for the rescuegroups API search, animalOrgID 1742 referring to the YoloSPCA and animalStatus ensuring that only "available" animals are listed.
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

// Gets the breed select element, defined as a global variable to work across multiple functions
var breedSelect = document.getElementById("breed");

// These are all the cat breeds options, where "name" shows in the dropdown and "value" is the search term sent to the rescuegroups API.
var catBreedOptions = [
    {name: "Domestic Short Hair", value: "short"},
    {name: "Domestic Medium Hair", value: "medium"},
    {name: "Domestic Long Hair", value: "long"},
    {name: "Tabby", value: "tabby"}
]

// These are all the dog breeds options, where "name" shows in the dropdown and "value" is the search term sent to the rescuegroups API.
var dogBreedOptions = [
    {name: "Labrador Retriever", value: "labrador"}
]

// Function run whenever a drop-down selection is made. This adds filters to the filters array above, which will be sent to the rescuegroups API in the Search() function. 
function submitForm() {
    event.preventDefault();
    let species = document.getElementById("species").value;
    let sex = document.getElementById("sex").value;
    let age = document.getElementById("age").value;
    let breed = document.getElementById("breed").value;
    if (species) {
        // This conditional shows/hides dog or cat breeds in the breed selection dropdown.
        if (species === "cat") {
            clearBreeds();
            catBreeds(breed);
        }
        else if (species === "dog") {
            clearBreeds();
            dogBreeds(breed);
        }
        filters.push({
            "fieldName" : "animalSpecies",
            "operation" : "equals",
            "criteria" : species
        })
    } else {
        // If no species is selected, all possible breeds are listed.
        allBreeds(breed);
    };
    
    // Sex filter
    if (sex) {
        filters.push({
            "fieldName" : "animalSex",
            "operation" : "equals",
            "criteria" : sex
        })
    };
    
    // Age filter
    if (age) {
        filters.push({
            "fieldName" : "animalGeneralAge",
            "operation" : "equals",
            "criteria" : age
        })
    };
    
    // Breed filter
    if (breed) {
        filters.push({
            "fieldName" : "animalBreed",
            "operation" : "contains",
            "criteria" : breed
        })
    } else {
        
    };
    // Executes the actual rescuegroups API search after filters are set
    search();
}

// Clears all breeds from dropdown except "any breed"
function clearBreeds() {
    breedSelect.options.length = 1;
}

// Iterates over the options defined in the cat breeds array to add cat breeds
function catBreeds(selectedBreed){
    for(let i=0; i<catBreedOptions.length; i++) {
        let isSelected;
        selectedBreed === catBreedOptions[i].value ? isSelected = true : isSelected = false;
        breedSelect.options[breedSelect.options.length] = new Option(catBreedOptions[i].name, catBreedOptions[i].value, false, isSelected);
    }
}

// Iterates over the options defined in the dog breeds array to add dog breeds
function dogBreeds(selectedBreed){
    for(let i=0; i<dogBreedOptions.length; i++) {
        let isSelected;
        selectedBreed === dogBreedOptions[i].value ? isSelected = true : isSelected = false;
        breedSelect.options[breedSelect.options.length] = new Option(dogBreedOptions[i].name, dogBreedOptions[i].value, false, isSelected);
    }
}

function allBreeds(selectedBreed){
    clearBreeds();
    catBreeds(selectedBreed);
    dogBreeds(selectedBreed);
}

// Search function for rescuegroups API based on filters defined by form input
function search() {
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
      document.getElementById("filters").textContent = JSON.stringify(filters)
      filters = [
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
  });
}

// One search with default parameters is run to populate the page with results
search();