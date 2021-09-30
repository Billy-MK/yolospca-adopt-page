var data = {
    "apikey" : "API_KEY_HERE",
    "objectType" : "animals",
    "objectAction" : "define"
}

fetch('https://api.rescuegroups.org/http/v2.json', {
    method: 'POST',
    body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => console.log(data.data));