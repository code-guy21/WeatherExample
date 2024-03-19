const API_KEY = 'fd2e05144199f31e5bf84141bbf6ec0c';
const searchButton = document.querySelector('#submit');
const cityInputField = document.querySelector('#city');
const resultsContainer = document.querySelector('.container');
const weatherContainer = document.querySelector('.weather');

searchButton.addEventListener('click', function () {
	const locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInputField.value}&limit=10&appid=${API_KEY}`;

	fetch(locationURL).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				for (let i = 0; i < data.length; i++) {
					console.log(data[i]);

					let cityButton = document.createElement('button');
					let cardElement = document.createElement('div');
					let countryElement = document.createElement('p');
					let nameElement = document.createElement('p');
					let stateElement = document.createElement('p');

					countryElement.textContent = data[i].country;
					nameElement.textContent = data[i].name;
					stateElement.textContent = data[i].state;
					cityButton.textContent = 'submit';

					cityButton.addEventListener('click', function () {
						searchWeather(data[i].lat, data[i].lon);
					});

					cardElement.append(
						countryElement,
						nameElement,
						stateElement,
						cityButton
					);

					resultsContainer.append(cardElement);
				}
			});
		}
	});
});

function searchWeather(lat, lon) {
	const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
	fetch(weatherURL).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				for (let i = 0; i < data.list.length; i += 8) {
					console.log(data.list[i]);
					let humidityElement = document.createElement('p');
					humidityElement.textContent = data.list[i].main.humidity + '%';
					weatherContainer.append(humidityElement);
				}
			});
		}
	});
}
