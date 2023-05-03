import React from 'react';
import GaugeChart from 'react-gauge-chart';
import './Gauge.css';

export function Gauge({ temperaturef, temperaturec, humidity }) {
    // Convert temperature 
    const temperatureFPercentage = temperaturef / 100;

    const temperatureCPercentage = temperaturec / 100;

    // Convert humidity (assuming in percentage) to a value between 0 and 1
    const humidityPercentage = humidity / 100;

    return (
        <div className="container">
            <h1 className="text-center my-4">Temperature and Humidity Gauges</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="gauge-container">
                        <h2>Temperature °F</h2>
                        <GaugeChart
                            id="temperatureF-gauge"
                            nrOfLevels={30}
                            percent={temperatureFPercentage}
                            textColor="#000000"
                            needleColor="#345243"
                            needleBaseColor="#345243"
                            colors={['#3A98B9', '#FFF1DC']}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="gauge-container">
                        <h2>Temperature °C</h2>
                        <GaugeChart
                            id="temperatureC-gauge"
                            nrOfLevels={30}
                            percent={temperatureCPercentage}
                            textColor="#000000"
                            needleColor="#345243"
                            needleBaseColor="#345243"
                            colors={['#3A98B9', '#FFF1DC']}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="gauge-container">
                        <h2>Humidity</h2>
                        <GaugeChart
                            id="humidity-gauge"
                            nrOfLevels={30}
                            percent={humidityPercentage}
                            textColor="#000000"
                            needleColor="#345243"
                            needleBaseColor="#345243"
                            colors={['#3A98B9', '#FFF1DC']}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}