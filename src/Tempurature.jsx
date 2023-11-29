// Temperature.jsx

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    LineElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    TimeScale
} from "chart.js";
import "./Temperature.css";
import { useSearchParams } from "react-router-dom";

ChartJS.register(
    Title,
    Tooltip,
    LineElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    TimeScale
);

Modal.setAppElement("#root"); // Set the root element for the modal

const Temperature = () => {
    let admitId = "";
    const [searchParams, setSearchParams] = useSearchParams();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        date: "",
        time: "6AM",
        temp: "",
        heartrate: "", // Added field
        vomiting: "Yes", // Default value is "No"
        urine: "Yes" // Default value is "No"
    });
    const [submittedData, setSubmittedData] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        async function getData() {
            let response = await fetch(
                "http://localhost:8081/get_temperature",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        admitId: searchParams.get("admitId")
                    })
                }
            );
            let result = await response.json();
            if (result.status === "success") {
                console.log(result);
                setSubmittedData(result.temperatures);
                let dates = result.temperatures.map((item) => item.date);
                setSelectedDates(dates);
                console.log(dates);
            } else {
                alert("Error occured");
                console.log(result);
            }
        }
        getData();
    }, []);

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleDateChange = (e) => {
        setFormData({
            ...formData,
            date: e.target.value
        });
    };

    const handleTimeSlotChange = (e) => {
        setFormData({
            ...formData,
            time: e.target.value
        });
    };

    const handleTemperatureChange = (e) => {
        setFormData({
            ...formData,
            temp: e.target.value
        });
    };
    const handleHeartrateChange = (e) => {
        setFormData({
            ...formData,
            heartrate: e.target.value
        });
    };

    const handleVomitingChange = (e) => {
        setFormData({
            ...formData,
            vomiting: e.target.value
        });
    };

    const handleUrineChange = (e) => {
        setFormData({
            ...formData,
            urine: e.target.value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const newData = { ...formData };

        let response = await fetch("http://localhost:8081/add_temperature", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                admitId: searchParams.get("admitId"),
                date: newData.date,
                time: newData.time,
                temp: newData.temp,
                heartrate: newData.heartrate,
                vomiting:newData.vomiting,
                urine:newData.urine
            })
        });
        let result = await response.json();
        if (result.status === "success") {
            setSubmittedData((prevData) => [...prevData, newData]);
            setSelectedDates((prevDates) => [...prevDates, formData.date]);
            setSelectedDate(formData.date);
            handleCloseForm();
        } else {
            alert("Error occured");
            console.log(result);
        }
    };

    const playNotificationMusic = () => {
        // Create an audio element and play music
        const audio = new Audio(
            "/C:UsersdhruvSaved GamesOneDriveDesktopsneh finaladminmusic.mp3"
        );
        audio.play();
    };
    const handleSave = () => {
        // Placeholder function for saving data
        console.log("Save button clicked. Implement your save logic here.");
    };

    // Concatenate date and time for chart labels
    const generateLineChartData = () => {
        const datasets = selectedDates.map((selectedDate, index) => {
            const dataForDate = submittedData
                .filter((data) => data.date === selectedDate)
                .map((data) => ({
                    x: `${data.date} ${data.time}`,
                    y: data.temp
                }));

            return {
                label: `Temperature Data - ${selectedDate}`,
                data: dataForDate,
                borderColor: `rgba(${Math.random() * 255},${
                    Math.random() * 255
                },${Math.random() * 255})`,
                tension: 0.3,
                fill: false,
                pointStyle: "rect",
                pointBorderColor: "blue",
                pointBackgroundColor: "#fff",
                showLine: true
            };
        });

        return {
            labels: submittedData.map((data) => data.time),
            datasets
        };
    };

    // Specify width and height for the chart
    const chartSize = {
        width: 200,
        height: 200
    };

    const timeSlots = [
        "12MN",
        "2AM",
        "4AM",
        "6AM",
        "8AM",
        "10AM",
        "12Noon",
        "2PM",
        "4PM",
        "6PM",
        "8PM",
        "10PM"
    ];

    return (
        <div className="main-container">
            <div>
                <h1>Temperature App</h1>
                <h2>Patient Name: {searchParams.get("patientName")}</h2>
              
                <button onClick={handleButtonClick}>Open Form</button>

                <Modal
                    isOpen={showForm}
                    onRequestClose={handleCloseForm}
                    contentLabel="Temperature Form"
                    className="modal-content" // Apply custom styling
                >
                    <div className="form-container">
                        <form onSubmit={handleFormSubmit}>
                            <label>Date:</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={handleDateChange}
                            />

                            <label>Time Slot:</label>
                            <select
                                value={formData.time}
                                onChange={handleTimeSlotChange}
                            >
                                {timeSlots.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>

                            <label>Temperature:</label>
                            <input
                                type="text"
                                value={formData.temp}
                                onChange={handleTemperatureChange}
                            />
                             <label>Heartrate:</label>
                            <input
                                type="text"
                                value={formData.heartrate}
                                onChange={handleHeartrateChange}
                            />

                            <label>Vomiting:</label>
                            <select
                                value={formData.vomiting}
                                onChange={handleVomitingChange}
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>

                            <label>Urine:</label>
                            <select
                                value={formData.urine}
                                onChange={handleUrineChange}
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>

                            <div className="button-container">
                                <button type="submit">Submit</button>
                                <button type="button" onClick={handleCloseForm}>
                                    Close Form
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>

                <div>
                    <h2>Line Chart</h2>
                    <Line
                        data={generateLineChartData()}
                        options={{ ...chartSize }}
                    />
                </div>

                <h2>Submitted Data</h2>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time Slot</th>
                            <th>Temperature</th>
                            <th>Heartrate</th>
                            <th>Vomiting</th>
                            <th>Urine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submittedData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.date}</td>
                                <td>{data.time}</td>
                                <td>{data.temp}</td>
                                <td>{data.heartrate}</td>
                                <td>{data.vomiting}</td>
                                <td>{data.urine}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="button-container">
                    <button type="button" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Temperature;
