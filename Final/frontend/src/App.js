import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetch('./data.json')
      .then((response) => response.json())
      .then((data) => {
        setTemperature(`${data.temperature_f} F / ${data.temperature_c} C`);
        setHumidity(`${data.humidity}%`);
        setDate(`Current Day: ${data.date}`);
      })
      .catch((err) => {
        console.log('error:' + err);
      });
  }, []);

  return (
    <div className="App" style={{ backgroundColor: '#EEEEEE', }}>
      {/* colors
      blue: #3A98B9
      tan: #FFF1DC
      beige: #E8D5C4
      grey: #EEEEEE */}
      <header>
        <nav class="navbar navbar-dark" aria-label="Dark offcanvas navbar" style={{ backgroundColor: '#E8D5C4', }}>
          <div class="container-fluid">
            <a class="navbar-brand text-dark" href="index.html">DHT22 Temperature Display</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbarDark"
              aria-labelledby="offcanvasNavbarDarkLabel" >
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarDarkLabel" >Visualization</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                  aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="graph.html">Graph</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Gauge</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="about.html">About Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div id="date" class="container-fluid d-flex justify-content-center text-center">
          <h1>{date}</h1>
        </div>
        <div class="container py-4">
          <div class="row align-items-md-stretch">
            <div class="col-md-6">
              <div class="h-100 p-5 rounded-3 d-flex justify-content-center text-center"
                style={{ backgroundColor: '#3A98B9', }}>
                <div id="temperature">
                  <h1>🌡</h1>
                  <h1>{temperature}</h1>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="h-100 p-5 border rounded-3 d-flex justify-content-center text-center" style={{ backgroundColor: '#FFF1DC', }}>
                <div id="humidity">
                  <h1>💧</h1>
                  <h1>{humidity}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
