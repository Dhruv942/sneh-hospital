import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./patient.css"

const Patient = () => {
    const [patientsData, setPatientData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        (async function () {
            const response = await fetch("http://localhost:8081/getall");
            const json = await response.json();
            console.log(json);
            setPatientData(json);
        })();
    }, []);

    const [selectedPatient, setSelectedPatient] = useState(null);

    const showDetails = (patient) => {
        setSelectedPatient(patient);
    };

    const admitPatient = async (patientId) => {
        let response = await fetch("http://localhost:8081/admit_patient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ patientId })
        });
        let result = await response.json();
        if (result.status === "success") {
            navigate("/Admitted Pateint");
        } else if (result.status === "failed") {
            alert(result.msg);
        } else {
            alert("Error occured");
            console.log(result);
        }
    };

    return (
        <div className="main-container">
            <h1>Patients</h1>
            <table
                style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    width: "100%"
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                border: "1px solid white",
                                padding: "8px"
                            }}
                        >
                            ID
                        </th>
                        <th
                            style={{
                                border: "1px solid white",
                                padding: "8px"
                            }}
                        >
                            Name
                        </th>
                        <th
                            style={{
                                border: "1px solid white",
                                padding: "8px"
                            }}
                        >
                            Mobile Number
                        </th>
                        <th
                            style={{
                                border: "1px solid white",
                                padding: "8px"
                            }}
                        >
                            Age
                        </th>
                     
                        <th
                            style={{
                                border: "1px solid white",
                                padding: "8px"
                            }}
                        >
                            Address
                        </th>
                        <th
                            style={{
                                border: "1px solid white",
                                padding: "8px"
                            }}
                        >
                            Admit
                        </th>
                        <th
                            style={{
                                border: "1px solid white",
                                padding: "8px"
                            }}
                        >
                            Show Details
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {patientsData.map((patient, index) => (
                        <tr key={patient._id}>
                            <td
                                style={{
                                    border: "1px solid white",
                                    padding: "8px"
                                }}
                            >
                                {patient._id + 1}
                            </td>
                            <td
                                style={{
                                    border: "1px solid white",
                                    padding: "8px"
                                }}
                            >
                                {patient.name}
                            </td>
                            <td
                                style={{
                                    border: "1px solid white",
                                    padding: "8px"
                                }}
                            >
                                {patient.mobileNumber}
                            </td>
                            <td
                                style={{
                                    border: "1px solid white",
                                    padding: "8px"
                                }}
                            >
                                {patient.age}
                            </td>
                          
                            <td
                                style={{
                                    border: "1px solid white",
                                    padding: "8px"
                                }}
                            >
                                {patient.address}
                            </td>
                            <td
                                style={{
                                    border: "1px solid white",
                                    padding: "8px"
                                }}
                            >
                                <button
                                    onClick={(e) => admitPatient(patient._id)}
                                >
                                    Admit
                                </button>
                            </td>
                            <td
                                style={{
                                    border: "1px solid white",
                                    padding: "8px"
                                }}
                            >
                                {/* Pass the entire patient object to the ShowDetails component */}
                                <a className="show"
                                        href={ `/showdetails?patientId=${patient._id}&patientName=${patient.name}`}
                                >
                                   Show Details
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Patient;
