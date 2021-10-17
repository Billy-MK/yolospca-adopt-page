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

// Search results default page
var page = 0;

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

// Function run whenever a drop-down selection is made, sets page to zero and runs the search function from page 0
function submitForm() {
    event.preventDefault();
    page = 0;
    // Executes the actual rescuegroups API search after filters are set
    search(0);
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
function search(page) {
    if (page < 0) {
        page = 0;
    }
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
    }
    // The actual rescuegroups API fetch request
    fetch('https://api.rescuegroups.org/http/v2.json', {
    method: 'POST',
    body: JSON.stringify({
        "apikey" : '',
            "objectType" : "animals",
            "objectAction" : "publicSearch",
            "search" : {
                "resultStart" : page * 8,
                "resultLimit" : 8,
                "resultSort" : "animalID",
                "resultOrder" : "asc",
                "calcFoundRows" : "Yes",
                "filters" : filters,
                "fields": ["animalName", "animalSex", "animalBreed", "animalGeneralAge", "animalPictures"]
            }
    })
})
  .then(response => response.json())
  .then(data => {
    let maxPages = Math.ceil((data.foundRows / 8));
    document.getElementById('current-page').innerHTML = (page+1) + "/" + maxPages
    document.getElementById('previous-button').disabled = page === 0 ? true:false
    document.getElementById('next-button').disabled = ((page+1)/maxPages) === 1 ? true:false
    document.getElementById("results").innerHTML = "";
      for (const key in data.data) {
          let cardHTML = `
            <div class="card">
                <img alt="" class="card-img-top profilePicture" src="${data.data[key].animalPictures[0].urlSecureFullsize}" />
                <div class="card-body">
                    <h5 class="card-title">${data.data[key].animalName}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${data.data[key].animalGeneralAge} ${data.data[key].animalSex}</li>
                    <li class="list-group-item">${data.data[key].animalBreed.replace('(short coat)', '').replace('(medium coat)', '').replace('(long coat)', '')}</li>
                </ul>
            </div>
          `
          let div = document.createElement("div");
          div.classList.add("col-md-3") 
          div.innerHTML = cardHTML
          document.getElementById("results").appendChild(div);
      }
      if (data.data.length < 1) {
        document.getElementById("results").innerHTML = "none"
        }
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

function changePage(targetPage) {
    event.preventDefault;
    if (targetPage === "next") {
        page += 1
    } 
    if (targetPage === "previous") {
        page -= 1
    }
    search(page)
}

// One search with default parameters is run to populate the page with results, and the breed drop-down is populated with all breed possibilities.
search(0);
allBreeds();