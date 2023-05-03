import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export function Graph({ temperaturef, temperaturec, humidityData }) {
    const data = [
        {
            name: 'Temperature °F',
            value: temperaturef,
            fill: '#3A98B9',
        },
        {
            name: 'Temperature °C',
            value: temperaturec,
            fill: '#3A98B9',
        },
        {
            name: 'Humidity',
            value: humidityData,
            fill: '#FFF1DC',
        },
    ];

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center text-center py-4">
                <h1>Temperature and Humidity Bar Graph</h1>
            </div>
            <div className="container d-flex justify-content-center">
                <BarChart width={window.innerWidth * 0.8} height={window.innerHeight * 0.8} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" />
                </BarChart>
            </div>
        </div>
    );
}