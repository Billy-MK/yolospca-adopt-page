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
        "apikey" : 'bos596JH',
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
    document.getElementById('animal-name').innerHTML = animalName
    document.getElementById('animal-sex').innerHTML = animalSex
    document.getElementById('animal-breed').innerHTML = animalBreed
    document.getElementById('animal-age').innerHTML = animalGeneralAge
    createCarousel(animalPictures);
    document.getElementById('animal-description').innerHTML = animalDescription
  })

  function createCarousel(pictures) {
      for (i=0; i<pictures.length; i++) {
        //   This loads the pictures as carousel items
        var carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (i===0) {
            carouselItem.classList.add('active');
        }
        carouselItem.innerHTML = `<img src="${pictures[i].urlSecureFullsize}" class="pet-image d-block w-100" alt="Image of ${animalName}">`
        document.getElementById('carousel-items').appendChild(carouselItem)
        //    This loads the appropriate number of slide indicators
        var carouselIndicator = document.createElement('button');
        if (i===0) {
            carouselIndicator.classList.add('active');
        }
        carouselIndicator.setAttribute("type", "button");
        carouselIndicator.setAttribute("data-bs-target", "pet-carousel");
        carouselIndicator.setAttribute("data-bs-slide-to", i);
        carouselIndicator.setAttribute("aria-label", "Slide "+(i+1));
        console.log(carouselIndicator)
        document.getElementById('carousel-indicators').appendChild(carouselIndicator)
      }
    }