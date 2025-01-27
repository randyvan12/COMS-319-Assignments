import './App.css';
import React, { useState, useEffect } from 'react';
import { Home } from './Home';
import { Graph } from './Graph';
import { Gauge } from './Gauge';
import { About } from './About';
import { Reports } from './Reports';

function App() {
  //Setting the data
  const [temperaturef, setTemperatureF] = useState('');
  const [temperaturec, setTemperatureC] = useState('');
  const [humidity, setHumidity] = useState('');
  const [date, setDate] = useState('');

  console.log("ENV: ", process.env);
  console.log("url:", process.env.SERVER_URL);

  const [page, setPage] = useState('home');

  // page changes
  function handlePageChange(newPage) {
    setPage(newPage);
  }

  function getNavLinkClass(targetPage) {
    return page === targetPage ? "nav-link active" : "nav-link";
  }

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_URL}/getData`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data[0]) {
          setTemperatureF(`${data[0].temperature_f} °F`);
          setTemperatureC(`${data[0].temperature_c} °C`);
          setHumidity(`${data[0].humidity}%`);
          setDate(`Current Day: ${data[0].date}`);
        }
      })
      .catch((err) => {
        console.log('error:' + err);
      });
  }, []);

  return (
    <div className="App" style={{ backgroundColor: '#EEEEEE', }}>
      <header>
        <nav class="navbar navbar-dark" aria-label="Dark offcanvas navbar">
          <div class="container-fluid">
            <a class="navbar-brand text-light" href="index.html">Team 47</a>
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
                    <a class={getNavLinkClass('home')} href='#' aria-current="page" onClick={() => handlePageChange('home')}>Home</a>
                  </li>
                  <li class="nav-item">
                    <a class={getNavLinkClass('graph')} href='#' onClick={() => handlePageChange('graph')}>Graph</a>
                  </li>
                  <li class="nav-item">
                    <a class={getNavLinkClass('gauge')} href='#' onClick={() => handlePageChange('gauge')}>Gauge</a>
                  </li>
                  <li class="nav-item">
                  <a class={getNavLinkClass('reports')} href='#' onClick={() => handlePageChange('reports')}>Reports</a>
                  </li>
                  <li class="nav-item">
                    <a class={getNavLinkClass('about')} href='#' onClick={() => handlePageChange('about')}>About Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main style={{ backgroundColor: '#EEEEEE', minHeight: 'calc(100vh - 76px)' }}>
        {page === 'home' && <Home date={date} temperaturef={temperaturef} temperaturec={temperaturec} humidity={humidity} />}
        {page === 'graph' && <Graph temperaturef={parseFloat(temperaturef.split(' ')[0])} temperaturec={parseFloat(temperaturec.split(' ')[0])} humidityData={parseFloat(humidity.slice(0, -1))} />}
        {page === 'gauge' && <Gauge temperaturef={parseFloat(temperaturef.split(' ')[0])} temperaturec={parseFloat(temperaturec.split(' ')[0])} humidity={parseFloat(humidity.slice(0, -1))} />}
        {page === 'reports' && <Reports></Reports>}
        {page === 'about' && <About />}
      </main>
    </div>
  );
}

export default App;
