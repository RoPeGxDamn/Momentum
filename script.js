   // DOM Elements
   /*********************************************/
   // Global
   const time = document.getElementById('time'),
   date = document.getElementById('date'),
   greeting = document.getElementById('greeting'),
   name = document.getElementById('name'),
   focus = document.getElementById('focus'),
   body = document.querySelector('body'),
   // Time
   week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
   months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
   // Background 
   base = 'assets/images/',
   partsOfDay = ['morning', 'day', 'evening', 'night'],
   images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
   btn = document.querySelector('.btn'),
   // Weather
   weatherIcon = document.querySelector('.weather-icon'),
   temperature = document.querySelector('.temperature'),
   weatherDescription = document.querySelector('.weather-description'),
   city = document.querySelector('.city'),
   speed = document.querySelector('.speed'),
   humidity = document.querySelector('.humidity'),
   // Quote
   blockquote = document.querySelector('blockquote'),
   figcaption = document.querySelector('figcaption'),
   btnQuote = document.querySelector('.btn-quote');
   
   let pictureIndex = 0,
   folderIndex = 0,
   max_rand = 6;

   // Get Quote
   async function getQuote() {  
    const url = `https://favqs.com/api/qotd`;
    const res = await fetch(url);
    const data = await res.json(); 
    blockquote.textContent = data.quote.body;
    figcaption.textContent = data.quote.author;
   }
 
    // Get Weather
    async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=b9cc422bc72776194f72fdc4576deda0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
  
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity + '%';
    speed.textContent = data.wind.speed + 'м/c';

    }

    // Get City
    function getCity() {
        if(localStorage.getItem('city') === null){
            city.textContent = '[Enter City]'
           }
           else{
               city.textContent = localStorage.getItem('city');
           }
    }

    // Set City
    function setCity(event) {
        let currentValue = localStorage.getItem('city');
        if(event.type === 'keypress'){
            if (event.code === 'Enter') {
                if(city.textContent === '' || city.textContent === currentValue){
                    localStorage.setItem('city', currentValue);
                    getCity();
                    getWeather();
                    city.blur();
                }
                else{
                    localStorage.setItem('city', event.target.innerText);
                    getWeather();
                    city.blur();
                }
            }
        }
        else if(event.type === 'click'){
            city.textContent = '';
        }
        else{
            localStorage.setItem('city', event.target.innerText);
        }
    }

    // View Background Image
    function viewBgImage(data) {
        const source = data;
        const img = document.createElement('img');
        img.src = source;
        img.onload = () => { body.style.backgroundImage = `url(${source})` };
    }

    // Get Image
    function getImage() {
        const index_i = pictureIndex % images.length;
        const index_j = folderIndex % partsOfDay.length;
        const imageSrc = base + partsOfDay[index_j] + '/' + images[index_i];
        viewBgImage(imageSrc);
        pictureIndex++;
        if(pictureIndex === 5){
            folderIndex++;
            pictureIndex = 0;
        }
        btn.disabled = true;
        setTimeout(function() { btn.disabled = false }, 1000);
    } 

   // Options
   const showAmPm = true;

   // Show Time
   function showTime() {
       let today = new Date(),
       monthDay = today.getDate(),
       weekDay = today.getDay(),
       month = today.getMonth(),
       hour = today.getHours(),
       min = today.getMinutes(),
       sec = today.getSeconds();
   
        // Set AM or PM
        const amPm = hour >= 12 ? 'PM' : 'AM';

        // Output Time
        time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;

        date.innerHTML = `${week[weekDay]}, ${monthDay} ${months[month]}`
        setTimeout(showTime, 1000);
   }

   // Add Zeros
   function addZero(n){
       return (parseInt(n,10) < 10 ? '0' : '') + n;
   }

   // Random Function
   function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min)) + min;
   }

   // Set Background and Greeting
   function setBgGreet() {
       let today = new Date(),
       hour = today.getHours(),
       random = getRandomInt(1, max_rand);

       if(hour > 6 && hour < 12){
            //Morning
            pictureIndex = 0;
            folderIndex = 0;
            document.body.style.backgroundImage = `url('assets/images/morning/${random}.jpg')`;
            greeting.textContent = 'Good Morning';
            max_rand--;
       }
       else if(hour > 12 && hour < 18){
            // Day
            pictureIndex = 0;
            folderIndex = 1;
            document.body.style.backgroundImage = `url('assets/images/day/${random}.jpg')`;
            greeting.textContent = 'Good Afternoon';
            document.body.style.color = 'white';
            max_rand--;
       }
       else if(hour > 18 && hour < 24){
           // Evening
           pictureIndex = 0;
           folderIndex = 2;
           document.body.style.backgroundImage = `url('assets/images/evening/${random}.jpg')`;
           greeting.textContent = 'Good Evening';
           document.body.style.color = 'white';
           max_rand--;
       }
       else{
           // Night
           pictureIndex = 0;
           folderIndex = 3;
           document.body.style.backgroundImage = `url('assets/images/night/${random}.jpg')`;
           greeting.textContent = 'Good Evening';
           document.body.style.color = 'white';
           max_rand--;
       }
   }

   // Get Name
   function getName() {
       if(localStorage.getItem('name') === null){
        name.textContent = '[Enter Name]'
       }
       else{
           name.textContent = localStorage.getItem('name');
       }
   }

   // Set Name
   function setName(e) {
       let currentValue = localStorage.getItem('name');
       if(e.type === 'keypress'){
        // Make sure enter is pressed
        if(e.which == 13 || e.keyCode == 13){
            if(name.textContent === '' || name.textContent === currentValue){
                localStorage.setItem('name', currentValue);
                getName();
                name.blur();
            }
            else{
                localStorage.setItem('name', e.target.innerText);
                name.blur();
            }
        }
       }
       else if(e.type === 'click'){
           name.textContent = '';
       }
       else{
           localStorage.setItem('name', e.target.innerText);
       }
   }

   // Get Focus
   function getFocus() {
    if(localStorage.getItem('focus') === null){
     focus.textContent = '[Enter Focus]'
    }
    else{
        focus.textContent = localStorage.getItem('focus');
    }
   }

    // Set Focus
    function setFocus(e) {
        let currentValue = localStorage.getItem('focus');
        if(e.type === 'keypress'){
         // Make sure enter is pressed
            if(e.which == 13 || e.keyCode == 13){
                if(focus.textContent === '' || focus.textContent === currentValue){
                    localStorage.setItem('focus', currentValue);
                    getFocus();
                    focus.blur();
                }
                else{
                    localStorage.setItem('focus', e.target.innerText);
                    focus.blur();
                }
            }
        }
        else if(e.type === 'click'){
            focus.textContent = '';
        }
        else{
            localStorage.setItem('focus', e.target.innerText);
        }
    }

    name.addEventListener('keypress', setName);
    name.addEventListener('blur', setName);
    name.addEventListener('click', setName)
    focus.addEventListener('keypress', setFocus);
    focus.addEventListener('blur', setFocus);
    focus.addEventListener('click', setFocus);
    btn.addEventListener('click', getImage);
    document.addEventListener('DOMContentLoaded', getWeather);
    city.addEventListener('keypress', setCity);
    city.addEventListener('click', setCity);
    document.addEventListener('DOMContentLoaded', getQuote);
    btnQuote.addEventListener('click', getQuote);

   // Run
   showTime();
   setBgGreet();
   getName();
   getFocus();
   getCity();
   getQuote();