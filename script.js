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

function submitForm() {
    event.preventDefault();
    if (document.getElementById("species").value) {
        filters.push({
            "fieldName" : "animalSpecies",
            "operation" : "equals",
            "criteria" : document.getElementById("species").value
        })
    };
    
    if (document.getElementById("sex").value) {
        filters.push({
            "fieldName" : "animalSex",
            "operation" : "equals",
            "criteria" : document.getElementById("sex").value
        })
    };
    
    if (document.getElementById("age").value) {
        filters.push({
            "fieldName" : "animalGeneralAge",
            "operation" : "equals",
            "criteria" : document.getElementById("age").value
        })
    };
    
    if (document.getElementById("breed").value) {
        filters.push({
            "fieldName" : "animalBreed",
            "operation" : "contains",
            "criteria" : document.getElementById("breed").value
        })
    };
    console.log(filters)
    search();
}

function search() {
    fetch('https://api.rescuegroups.org/http/v2.json', {
    method: 'POST',
    body: JSON.stringify({
        "apikey" : 'bos596JH',
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

search();