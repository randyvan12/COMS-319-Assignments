import React, { useState, useEffect, useRef} from 'react';

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
 
    const update = (index, note) => {
        console.log(`${index}: `, note);
        let item = items[index];
        item.note = note;

        console.log("Updating:", item);

        fetch(`http://localhost:8081/records/${item._id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(item)
        })
        .then((res) => {
            console.log("delete res:", res.body);
        })
        .then(res => res.json())
        .catch((err) => {
            console.log('error:' + err);
        });

        setItems([...items]);
    };

    return (
        <main>
            <div class="container">
              <ReportHeader />
                {
                    items.map((i, index) => <ReportRow initNote={i.note} id={i._id} date={i.date} tempf={i.temperature_f} tempc={i.temperature_c} humidity={i.humidity} remove={() => remove(index)} handleUpdate={(note) => update(index, note)} />)
                }
            </div>
        </main>
    )
}

function ReportHeader() {
    return (        
    <div class="row">
        <div class="col-3">
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
        <div class="col-3">
            Note
        </div>
        <div class="col-2 ml-auto">
            Controls
        </div>
    </div>
);
}

function ReportRow({id, initNote, date, tempf, tempc, humidity, remove, handleUpdate}) {
    let noteRef = useRef(null);

    return (
        <div class="row" key={id}>
            <div class="col-3">
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
            <div class="col-3">
                <input type="text" maxLength={32} size={22} ref={noteRef} defaultValue={initNote}></input>
            </div>
            <div class="col-2 ml-auto">
                <button type="button" class="btn btn-primary" onClick={e => handleUpdate(noteRef.current.value)}>Update</button>
                <button type="button" class="btn btn-danger" onClick={remove}>Remove</button>
            </div>
        </div>
    )
}