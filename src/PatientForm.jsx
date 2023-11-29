import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientForm.css";

function PatientForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        age: "",
       
        mobileNumber: "",
        address: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        // You can perform any actions with the form data here
        // For example, send the form data to the server

        let response = await fetch("http://localhost:8081/addpatient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...formData, age: parseInt(formData.age) })
        });
        let result = await response.json();
        if (result.status === "success") {
            navigate("/patient");
        } else {
            alert("Error occured");
            console.log(result);
        }
    };

    return (
        <div className="main-container">
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Patient Information</h2>

                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

        

                <div className="form-group">
                    <label>Mobile Number:</label>
                    <input
                        type="tel" // Changed to "tel" for phone number input
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Address:</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PatientForm;
