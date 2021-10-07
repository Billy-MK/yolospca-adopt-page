// Default filters for the rescuegroups API search, animalOrgID 1742 referring to the YoloSPCA and animalStatus ensuring that only "available" animals are listed.
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
var breedSelectElement = document.getElementById("breed");

// These are all the cat breeds options, where "name" shows in the dropdown and value is the search term sent to the rescuegroups API.
var catBreedOptions = [{name:"Domestic Short Hair",value:"short"},{name:"Domestic Medium Hair",value:"medium"},{name:"Domestic Long Hair",value:"long"},{name:"Tabby",value:"tabby"}]

// These are all the dog breeds options, where "name" shows in the dropdown and value is the search term sent to the rescuegroups API.
var dogBreedOptions = [{name: "Akita", value: "Akita"},{name:"American Pit Bull Terrier",value:"American Pit Bull Terrier"},{name:"Australian Cattle Dog",value:"Australian Cattle Dog"},{name:"Basset Hound",value:"Basset Hound"},{name:"Bichon Frise",value:"Bichon Frise"},{name:"Border Collie",value:"Border Collie"},{name:"Border Terrier",value:"Border Terrier"},{name:"Boston Terrier",value:"Boston Terrier"},{name:"Boxer",value:"Boxer"},{name:"Bulldog",value:"Bulldog"},{name:"Bull Terrier",value:"Bull Terrier"},
{name:"Beagle",value:"Beagle"},{name:"Catahoula Leopard Dog",value:"Catahoula Leopard Dog"},{name:"Cavalier King Charles Spaniel",value:"Cavalier King Charles Spaniel"},{name:"Chihuahua",value:"Chihuahua"},{name:"Chow Chow",value:"Chow Chow"},{name:"Cocker spaniel",value:"Cocker spaniel"},{name:"Dachshund",value:"Dachshund"},{name:"Dalmatian",value:"Dalmatian"},{name:"Doberman",value:"Doberman"},{name:"German Shepherd Dog",value:"German Shepherd Dog"},{name:"German Shorthaired Pointer",value:"German Shorthaired Pointer"},
{name:"Golden Retriever",value:"Golden Retriever"},{name:"Great Dane",value:"Great Dane"},{name:"GreyhoundHavanese",value:"GreyhoundHavanese"},{name:"Husky",value:"Husky"},{name:"Italian Greyhound",value:"Italian Greyhound"},{name:"Jack Russell Terrier",value:"Jack Russell Terrier"},{name:"King Charles Spaniel",value:"King Charles Spaniel"},{name:"Labrador Retriever",value:"Labrador Retriever"},{name:"Lhasa Apso",value:"Lhasa Apso"},{name:"Malamute",value:"Malamute"},{name:"Maltese",value:"Maltese"},
{name:"Miniature Pinscher",value:"Miniature Pinscher"},{name:"Newfoundland",value:"Newfoundland"},{name:"Norfolk Terrier",value:"Norfolk Terrier"},{name:"Papillon",value:"Papillon"},{name:"Pekingese",value:"Pekingese"},{name:"Pointer",value:"Pointer"},{name:"Pomeranian",value:"Pomeranian"},{name:"Poodle",value:"Poodle"},{name:"Pug",value:"Pug"},{name:"Rat Terrier",value:"Rat Terrier"},{name:"Rhodesian Ridgeback",value:"Rhodesian Ridgeback"},{name:"Rottweiler",value:"Rottweiler"},{name:"Saint Bernard",
value:"Saint Bernard"},{name:"Shiba Inu",value:"Shiba Inu"},{name:"Shih Tzu",value:"Shih Tzu"},{name:"Toy Fox Terrier",value:"Toy Fox Terrier"},{name:"Weimaraner",value:"Weimaraner"}];

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
            populateBreeds(catBreedOptions, breed)
        }
        if (species === "dog") {
            clearBreeds();
            populateBreeds(dogBreedOptions, breed)
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
    breedSelectElement.options.length = 1;
}

// Iterates over the options defined in the breeds array to add breeds
function populateBreeds(breeds, selectedBreed){
    for(let i=0; i<breeds.length; i++) {
        let isSelected;
        selectedBreed === breeds[i].value ? isSelected = true : isSelected = false;
        breedSelectElement.options[breedSelectElement.options.length] = new Option(breeds[i].name, breeds[i].value, false, isSelected);
    }
}

function allBreeds(selectedBreed){
    clearBreeds();
    populateBreeds(catBreedOptions, selectedBreed);
    populateBreeds(dogBreedOptions, selectedBreed);
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
      // Filters are reset after a call is made
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

// One search with default parameters is run to populate the page with results, and the breed drop-down is populated with all breed possibilities.
search();
allBreeds();