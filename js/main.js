const gelokyKEY = config.GELOKY_KEY
const nasaKEY = config.NASA_KEY

document.querySelector('form').addEventListener("submit", (e) => {
  e.preventDefault()
  getLatLon()
})

document.querySelector('#reset').addEventListener("click", () => {
  document.querySelector("#location").value = ""
  document.querySelector("img").src = ""
  document.querySelector("h2").innerHTML = ""
  document.querySelector("#reset").style.display = "none";
})

async function getLatLon() {
  let lon
  let lat
  const address = document.querySelector('#location').value
  const gelokyURL = `https://geloky.com/api/geo/geocode?address=${address}&key=${gelokyKEY}&format=geloky`
  
  await fetch(gelokyURL)
    .then(res => res.json())
    .then(data => {
      lon = Number(data[0].longitude)
      lat = Number(data[0].latitude)
      document.querySelector("h2").innerText = `Image Loading...!`
      getImage(lon, lat, address)
      document.querySelector("#reset").style.display = "block";
    })
    .catch(err => {
      console.error(err)
      alert("You entered an invalid address, try again!")
      document.querySelector('#location').value = ""
    })
}

async function getImage(lon, lat, address) {
  const nasaURL = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=0.10&date=2020-11-01&api_key=${nasaKEY}`
  await fetch(nasaURL)
    .then(res => {
      document.querySelector("h2").innerText = `This is a Satellite Image from Nasa at ${address}`
      document.querySelector("img").src = res.url
    })
    .catch(err => {
      console.error(err)
    })
  
}