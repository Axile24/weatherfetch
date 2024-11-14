
const apikey = "30dtg8RR6kso6lD8OYnWeJ1cBqtEY2Bd";

async function getWeather() {
    // Hämta värdet från inputfältet
    const userLocation = document.getElementById("location").value.trim();
    if (!userLocation) {
        alert("Ange ett giltigt stadnamn.");
        return;
    }

    const url = `https://api.tomorrow.io/v4/weather/realtime?location=${encodeURIComponent(userLocation)}&apikey=${apikey}`;
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    try {
        // Skicka API-förfrågan
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`Data för ${userLocation} hittades inte.`);

        const data = await res.json();
        displayWeather(userLocation, data);
    } catch (error) {
        console.error("Fel vid hämtning:", error.message);
        document.getElementById("weather-container").innerHTML = `<p>Fel: ${error.message}</p>`;
    }
}

// Funktion för att visa väderdata på sidan
function displayWeather(city, data) {
    document.getElementById("weather-container").innerHTML = `
        <h3>Vädret i ${city}</h3>
        <p>Temperatur: ${data.data.values.temperature}°C</p>

    `;
}