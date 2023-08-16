const nasaKEY = config.NASA_KEY

// Retreive Current Date
var date = new Date();
var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });
var currentDate = year + "-" + month + "-" + day;
document.getElementById("date").value = currentDate;
getImage()

// Display Explanation When Info Icon is Hovered
document.getElementById("info-icon").addEventListener("mouseover", () => {
  document.getElementById("explanation").style.display = "block";
})
document.getElementById("info-icon").addEventListener("mouseleave", () => {
  document.getElementById("explanation").style.display = "none";
})

// Handle Generate Image Form Submission
document.querySelector('form').addEventListener("submit", (e) => {
  e.preventDefault()
  getImage()
})

// Get Image from NASA API & Fill Page with Data Retrieved
async function getImage() {
  const date = document.getElementById("date").value;
  const nasaURL = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${nasaKEY}`
  const res = await fetch(nasaURL);
  const data = await res.json();
  if (data.title === undefined) {
    document.getElementById("title").innerText = "Picture Not Found, Try Another Date!"
    document.getElementById("explanation").innerText = "Picture Not Found, Try Another Date!"
    document.querySelector("img").src = data.url
  } else {
    document.getElementById("title").innerText = data.title
    document.getElementById("explanation").innerText = data.explanation
    document.querySelector("img").src = data.url
  }
  
}