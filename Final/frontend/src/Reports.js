import React, { useState, useEffect } from 'react';
import './Reports.css'

export function Reports() {
    let [items, setItems] = useState([]);


    const remove = (index) => {
        const id = items[index]._id;

        fetch(`http://localhost:8081/records/${id}`, { method: 'DELETE' })
        .then((res) => {
            console.log("delete res:", res.body);
        })
        .then(res => res.json())
        .catch((err) => {
            console.log('error:' + err);
        });
        
        items.splice(index, 1);
        setItems([...items]);
    };

    useEffect(() => {
    fetch('http://localhost:8081/records')
        .then((response) => response.json())
        .then((data) => {
            setItems([...data]);
            console.log("items:", data);
        })
        .catch((err) => {
            console.log('error:' + err);
        });
    }, []);


    return (
        <main>
            <div class="container">
              <ReportHeader />
                {
                    items.map((i, index) => <ReportRow date={i.date} tempf={i.temperature_f} tempc={i.temperature_c} humidity={i.humidity} remove={() => remove(index)}/>)
                }
            </div>
        </main>
    )
}

function ReportHeader() {
    return (        
    <div class="row">
        <div class="col">
            Timestamp
        </div>
        <div class="col">
            Fahrenheit
        </div>
        <div class="col">
            Celcius
        </div>
        <div class="col">
            Humidity
        </div>
        <div class="col ml-auto">
            Controls
        </div>
    </div>
);
}

function ReportRow({date, tempf, tempc, humidity, remove}) {
    return (
        <div class="row">
            <div class="col">
                {date}
            </div>
            <div class="col">
                {tempf}
            </div>
            <div class="col">
                {tempc}
            </div>
            <div class="col">
                {humidity}
            </div>
            <div class="col ml-auto">
                <button type="button" class="btn btn-danger" onClick={remove}>Remove</button>
            </div>
        </div>
    )
}