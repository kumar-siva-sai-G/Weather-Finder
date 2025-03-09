document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('locationInput');
    const searchButton = document.getElementById('searchButton');
    const weatherInfo = document.getElementById('weatherInfo');
    const weatherData = document.getElementById('weatherData');
    const locationName = document.getElementById('locationName');
    const temperature = document.getElementById('temperature');
    const condition = document.getElementById('condition');
    const conditionIcon = document.getElementById('conditionIcon');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const feelslike = document.getElementById('feelslike');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');

    searchButton.addEventListener('click', function() {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    });

    function fetchWeather(location) {
        weatherData.style.display = 'none';
        error.textContent = '';
        loading.style.display = 'block';

        const apiKey = '0e29f319b00c4de78b3122811250903';
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                loading.style.display = 'none';
                displayWeather(data);
            })
            .catch(err => {
                loading.style.display = 'none';
                error.textContent = 'Could not retrieve weather data. Please check the location and your internet connection.';
                console.error('Fetch error:', err);
            });
    }

    function displayWeather(data) {
        locationName.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
        temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
        condition.textContent = `Condition: ${data.current.condition.text}`;
        conditionIcon.src = `http:${data.current.condition.icon}`;
        humidity.textContent = `Humidity: ${data.current.humidity}%`;
        wind.textContent = `Wind: ${data.current.wind_kph} kph`;
        feelslike.textContent = `Feels like: ${data.current.feelslike_c}°C`;
        weatherData.style.display = 'block';
    }
});