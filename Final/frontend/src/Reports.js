import React, { useState, useEffect, useRef } from 'react';
import './Reports.css';

export function Reports() {
    let [items, setItems] = useState([]);


    const remove = (index) => {
        const id = items[index]._id;

        fetch(`http://${process.env.REACT_APP_URL}/records/${id}`, { method: 'DELETE' })
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
        fetch(`http://${process.env.REACT_APP_URL}/records`)
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

        fetch(`http://${process.env.REACT_APP_URL}/records/${item._id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
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
            <div className="container mt-5">
                <h2>Saved Records</h2>
                <table className="table table-bordered table-hover">
                    <ReportHeader />
                    <tbody>
                        {items.map((i, index) => (
                            <ReportRow
                                item={i}
                                initNote={i.note}
                                id={i._id}
                                date={i.date}
                                tempf={i.temperature_f}
                                tempc={i.temperature_c}
                                humidity={i.humidity}
                                remove={() => remove(index)}
                                handleUpdate={(note) => update(index, note)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

function ReportHeader() {
    return (
        <thead>
            <tr>
                <th>Timestamp</th>
                <th>Fahrenheit</th>
                <th>Celcius</th>
                <th>Humidity</th>
                <th>Note</th>
                <th>Controls</th>
            </tr>
        </thead>
    );
}

function ReportRow({ item, remove, handleUpdate }) {
    let noteRef = useRef(null);

    return (
        <tr key={item._id}>
            <td>{item.date}</td>
            <td>{item.temperature_f}</td>
            <td>{item.temperature_c}</td>
            <td>{item.humidity}</td>
            <td>
                <input
                    type="text"
                    maxLength={32}
                    size={22}
                    ref={noteRef}
                    defaultValue={item.note}
                    className="form-control"
                ></input>
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={(e) => handleUpdate(noteRef.current.value)}
                >
                    Update
                </button>
                <button type="button" className="btn btn-danger" onClick={remove}>
                    Remove
                </button>
            </td>
        </tr>
    );
}