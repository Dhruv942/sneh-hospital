import React, { useEffect, useState } from "react";
import "./Usertable.css";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
    const navigate = useNavigate();

    const [data, setPatientData] = useState([]);

    useEffect(() => {
        (async function () {
            const response = await fetch("http://localhost:8081/get_admits");
            const json = await response.json();
            console.log(json);
            setPatientData(json);
        })();
    }, []);

    // const data = [
    //     {
    //         id: 1,
    //         name: "John Doe",
    //         mobileNumber: "123-456-7890",
    //         admittedDate: "2023-01-15",
    //         temperature: "98.6°F",
    //         heartRate: "72 bpm"
    //     }
    //     // Add more data as needed
    // ];

    const handleTemperature = (patientId, patientName, admitId) => {
        navigate(
            `/temperature?admitId=${admitId}&patientId=${patientId}&patientName=${patientName}`
        );
    };

    const handleHeartRate = (userData) => {
        console.log("Heart Rate for user:", userData);
        navigate(`/heartrate?name=${userData.name}`);
    };
    const handleDrSheet = (userData) => {
        navigate(`/drsheet?admitId=${userData._id}&name=${userData.patientId.name}&patientId=${userData.patientId._id}`);
    };

    const handleDrugChart = (userData) => {
        navigate(`/drugchart?admitId=${userData._id}&name=${userData.patientId.name}&patientId=${userData.patientId._id}`);
    };
    const handleDischarge = async (userData, index) => {
        let response = await fetch("http://localhost:8081/discharge_patient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ admitId:userData._id })
        });
        let result = await response.json();
        if (result.status === "success") {
            navigate(`/bill?admitId=${userData._id}&name=${userData.patientId.name}&patientId=${userData.patientId._id}`);
        } else if (result.status === "failed") {
            alert(result.msg);
        } else {
            alert("Error occured");
            console.log(result);
        }
    };

  

    return (
        <div className="main-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Admit Id:</th>
                        <th>Name</th>
                        <th>Mobile Number</th>
                        <th>Admitted Date</th>
                        <th>Temperature</th>
                       
                        <th>Discharge </th>
                        <th>DrSheet</th>
                        <th>Drug Chart</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row._id + 1}</td>
                            <td>{row.patientId.name}</td>
                            <td>{row.patientId.mobileNumber}</td>
                            <td>{new Date(row.admitDate).toDateString()}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleTemperature(
                                            index + 1,
                                            row.patientId.name,
                                            row._id
                                        )
                                    }
                                >
                                    Check
                                </button>
                            </td>
                        
                            <td>
                                <button
                                    onClick={() =>
                                        handleDischarge(row, index)
                                    }
                                >
                                    Discharge
                                </button>
                            </td>
                            <td>
                            <button
                                onClick={() => handleDrSheet(row)}
                            >
                                DrSheet
                            </button>
                            </td>
                            <td>
                            <button
                                    onClick={() => handleDrugChart(row)}
                                >
                                    Drug Chart
                                </button>
                            </td>
                        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
