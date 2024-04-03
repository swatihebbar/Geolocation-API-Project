const btn = document.getElementById("btn");
const country_container = document.getElementById("country-container");
const map = document.getElementById("map");

//geolocation api

// if("geolocation" in navigator) {
//     // console.log("yes")
//     // console.log(navigator.geolocation);
//     navigator.geolocation.getCurrentPosition(function(position) {
//         console.log(position);
//     })
// }

function geo() {
    if("geolocation" in navigator) {
        // console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition(function(position) {
            // console.log(position);
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>`;

            geolocation(lat, long);
        });
        
    }
}

const geolocation = async(lat, long) => {
    try{
        const response = await fetch(`http://api.positionstack.com/v1/reverse?access_key=b3a362578ca19ffafe9e233dd4747add&query=${lat},${long}`)

        const data = await response.json();
        console.log(data);
        const country = data.data[0];
        country_container.innerHTML =
        `<div class="content">
        <h2>Continent</h2>
        <p>${country.continent}</p>
      </div>
      <div class="region">
        <h2>Region</h2>
        <p>${country.region}</p>
      </div>
      <div class="street">
        <h2>Street</h2>
        <p>${country.street}</p>
      </div>
      <div class="region">
        <h2>Region</h2>
        <p>Region</p>
      </div>
      <div class="Address">
        <h2>Address</h2>
        <p>${country.label}</p>
      </div>`; 
    } catch (error) {
        console.log(error);  
    }
}

// geo();
btn.addEventListener("click", geo);