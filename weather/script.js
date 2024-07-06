document.addEventListener("DOMContentLoaded", function() {
    const tokyoApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=35.682839&longitude=139.759455&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=Asia/Tokyo";
    const gunmaApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=36.3907&longitude=139.0608&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=Asia/Tokyo";

    // Fetch Tokyo weather data
    fetch(tokyoApiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.current_weather.temperature;
            const weatherDescription = data.current_weather.weathercode;
            const maxTemperature = data.daily.temperature_2m_max[0];
            const minTemperature = data.daily.temperature_2m_min[0];

            document.getElementById("tokyo-temperature").innerText = `${temperature}℃`;
            document.getElementById("tokyo-description").innerText = getWeatherDescription(weatherDescription);
            document.getElementById("tokyo-high-temp").innerText = `最高気温: ${maxTemperature}℃`;
            document.getElementById("tokyo-low-temp").innerText = `最低気温: ${minTemperature}℃`;

            const tokyoWeeklyForecast = document.getElementById("tokyo-weekly-forecast");
            data.daily.time.forEach((time, index) => {
                const dayWeatherDescription = getWeatherDescription(data.daily.weathercode[index]);
                const dayMaxTemp = data.daily.temperature_2m_max[index];
                const dayMinTemp = data.daily.temperature_2m_min[index];
                const forecastElement = document.createElement("div");
                forecastElement.innerText = `${time}: ${dayWeatherDescription}, 最高気温: ${dayMaxTemp}℃, 最低気温: ${dayMinTemp}℃`;
                tokyoWeeklyForecast.appendChild(forecastElement);
            });
        })
        .catch(error => console.error('Error fetching the Tokyo weather data:', error));

    // Fetch Gunma weather data
    fetch(gunmaApiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.current_weather.temperature;
            const weatherDescription = data.current_weather.weathercode;
            const maxTemperature = data.daily.temperature_2m_max[0];
            const minTemperature = data.daily.temperature_2m_min[0];

            document.getElementById("gunma-temperature").innerText = `${temperature}℃`;
            document.getElementById("gunma-description").innerText = getWeatherDescription(weatherDescription);
            document.getElementById("gunma-high-temp").innerText = `最高気温: ${maxTemperature}℃`;
            document.getElementById("gunma-low-temp").innerText = `最低気温: ${minTemperature}℃`;

            const gunmaWeeklyForecast = document.getElementById("gunma-weekly-forecast");
            data.daily.time.forEach((time, index) => {
                const dayWeatherDescription = getWeatherDescription(data.daily.weathercode[index]);
                const dayMaxTemp = data.daily.temperature_2m_max[index];
                const dayMinTemp = data.daily.temperature_2m_min[index];
                const forecastElement = document.createElement("div");
                forecastElement.innerText = `${time}: ${dayWeatherDescription}, 最高気温: ${dayMaxTemp}℃, 最低気温: ${dayMinTemp}℃`;
                gunmaWeeklyForecast.appendChild(forecastElement);
            });
        })
        .catch(error => console.error('Error fetching the Gunma weather data:', error));

    function getWeatherDescription(weatherCode) {
        const weatherDescriptions = {
            0: "快晴",
            1: "ほぼ快晴",
            2: "部分的に曇り",
            3: "曇り",
            45: "霧",
            48: "霧氷を伴う霧",
            51: "小雨",
            53: "中程度の雨",
            55: "激しい雨",
            56: "小さな氷雨",
            57: "強い氷雨",
            61: "弱い雨",
            63: "中程度の雨",
            65: "激しい雨",
            66: "弱い氷雨",
            67: "強い氷雨",
            71: "弱い雪",
            73: "中程度の雪",
            75: "強い雪",
            77: "雪粒",
            80: "弱いにわか雨",
            81: "中程度のにわか雨",
            82: "激しいにわか雨",
            85: "弱いにわか雪",
            86: "強いにわか雪",
            95: "弱い雷雨",
            96: "弱い雹を伴う雷雨",
            99: "激しい雹を伴う雷雨"
        };

        return weatherDescriptions[weatherCode] || "不明";
    }
});
