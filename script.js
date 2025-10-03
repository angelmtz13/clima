const apiKey = "031f9c47139ba9faac8aed601e8b4e88";
const buscarBtn = document.getElementById("buscar");
const ciudadInput = document.getElementById("ciudad");
const resultadoDiv = document.getElementById("resultado");

async function obtenerClima(ciudad) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`
    );

    if (!response.ok) {
      throw new Error("Ciudad no encontrada");
    }

    const data = await response.json();
    mostrarClima(data);
  } catch (error) {
    resultadoDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function mostrarClima(data) {
  resultadoDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
    <p>Temperatura: ${data.main.temp}°C</p>
    <p>Clima: ${data.weather[0].description}</p>
    <p>Humedad: ${data.main.humidity}%</p>
    <p>Viento: ${data.wind.speed} m/s</p>
  `;
}

buscarBtn.addEventListener("click", () => {
  const ciudad = ciudadInput.value.trim();
  if (ciudad) {
    obtenerClima(ciudad);
  }
});

ciudadInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscarBtn.click();
  }
});
