import React from 'react';
import icon from './pi_icon.png';
import { useScrollPosition } from './useScrollPosition';

export function Home(props) {
    const scrollPosition = useScrollPosition();

    const introOpacity = 1 - Math.min(scrollPosition / 200, 1);
    const dataOpacity = Math.min(scrollPosition / 200, 1);

    const recordTemp = () => {
        let item = {
            date: props.date,
            temperature_c: props.temperaturec,
            temperature_f: props.temperaturef,
            humidity: props.humidity
        };

        fetch('http://localhost:8081/records/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(item)
        })
            .then((res) => {
            })
            .catch(e => console.error(e));
    };

    return (
        <div>
            <div
                id="intro"
                className="container-fluid d-flex flex-column align-items-center text-center"
                style={{
                    minHeight: '100vh',
                    opacity: introOpacity,
                    transition: 'opacity 0.5s',
                }}
            >
                <img src={icon} className="App-logo" alt="logo" />
                <h1 className="mt-3">DHT22 Temperature Display</h1>
            </div>
            <div
                id="data-section"
                style={{
                    minHeight: '100vh',
                    opacity: dataOpacity,
                    transition: 'opacity 0.5s',
                }}
            >
                <div id="date" className="container-fluid d-flex justify-content-center text-center">
                    <h1>{props.date}</h1>
                </div>
                <div className="container py-4">
                    <div className="row align-items-md-stretch">
                        <div className="col-md-6">
                            <div
                                className="h-100 p-5 rounded-3 d-flex justify-content-center text-center"
                                style={{ backgroundColor: '#3A98B9' }}
                            >
                                <div id="temperature">
                                    <h1>🌡</h1>
                                    <h1>{props.temperaturef} / {props.temperaturec}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div
                                className="h-100 p-5 border rounded-3 d-flex justify-content-center text-center"
                                style={{ backgroundColor: '#FFF1DC' }}
                            >
                                <div id="humidity">
                                    <h1>💧</h1>
                                    <h1>{props.humidity}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" d-flex justify-content-center"><button className="btn btn-primary" onClick={recordTemp}>Record Temperature</button> </div>
            </div>
        </div>
    );
}