let latitude, longitude, destination;

const data = [
  {
    id: 1,
    name: "Taj Mahal",
    location: [78.0421, 27.1751],
    image: "taj-mahal.jpg",
  },
  {
    id: 2,
    name: "Qutub Minar",
    location: [77.1855, 28.5245],
    image: "qutub-minar.jpg",
  },
  {
    id: 3,
    name: "Gateway of India",
    location: [72.8347, 18.922],
    image: "gateway-of-india.jpg",
  },
  {
    id: 4,
    name: "Konark Sun Temple",
    location: [86.0945, 19.8876],
    image: "konark-temple.jpg",
  },
  {
    id: 5,
    name: "Char Minar",
    location: [78.4747, 17.3616],
    image: "charminar.jpg",
  },
];

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGlwYW1zZW4iLCJhIjoiY2t4NHEzZGFrMHhqbzJvcWt1YW43bjU5bCJ9.3DZNA0EqHrBKdvJ36jwfCw";

$(document).ready(function () {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      main();
    });
  } else {
    alert("Browser unsupported.");
  }
});

function main() {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [78.9629, 20.5937],
    zoom: 4,
  });

  map.addControl(
    new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl }).on(
      "result",
      (e) => (destination = e.result.center)
    )
  );

  const markers = [];
  data.forEach((mon) => {
    const imageContainer = document.querySelector("#images");
    const img = document.createElement("img");
    img.src = "assets/" + mon.image;
    img.classList.add("image-marker");
    imageContainer.appendChild(img);

    const marker = new mapboxgl.Marker({ element: img })
      .setLngLat(mon.location)
      .addTo(map);
    markers.push(marker);
  });
}

$(function () {
  $("#weather-btn").click(function () {
    window.location.href = `ar_weather.html?source=${latitude};${longitude}&destination=${destination[1]};${destination[0]}`;
  });
});
