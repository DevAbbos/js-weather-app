const api = {
	key: '52af2ed2de665e8537f980913f2b6b0d',
	baseurl: 'https://api.openweathermap.org/data/2.5/' 
};

const seatchBox = document.querySelector('.search-box');

seatchBox.addEventListener('keypress', setQuery);

function setQuery(e){
	if(e.keyCode == 13){
		getResults(seatchBox.value);
	}
}

function getResults(query){
	fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
	.then(weather =>{
		return weather.json()
	}).then(displayResults);
}

function displayResults(weather){
	let city = document.querySelector('.location .city')
	city.innerHTML = `${weather.name}, ${weather.sys.country}`;

	let now = new Date();
	let date = document.querySelector('.location .date');
	date.innerHTML = dateBuilder(now);

	let temp = document.querySelector('.temp');
	temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

	let weatherEl = document.querySelector('.weather');
	weatherEl.innerHTML = weather.weather[0].main;

	let hilow = document.querySelector('.hi-row');
	hilow.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

}
function dateBuilder(s){
	let months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
	let days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

	let day = days[s.getDay()];
	let date = s.getDate()
	let month = months[s.getMonth()];
	let year = s.getFullYear();

	return `${day} ${date} ${month} ${year}`
}