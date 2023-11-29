// DrugChart.js
import React, { useState } from 'react';
import './DrugChart.css'; // Import your custom CSS
import { useSearchParams } from "react-router-dom";
import { useEffect } from 'react';

const DrugChart = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [drugData, setDrugData] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    drug: '',
    instruction: '',
    time: '',
    route: '',
    dose: '',
    frequency: '',
  });

  useEffect(() => {
    // console.log('Form data submitted:', formData);
    (async function(){let response = await fetch("http://localhost:8081/get_drug_chart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                admitId: searchParams.get("admitId")
            })
        });
        let result = await response.json();
        if (result.status === "success") {
          setDrugData(result.data);
          console.log(result);
        } else {
            alert("Error occured");
            console.log(result);
        }})()
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // console.log(formData);
    let response = await fetch("http://localhost:8081/add_drug_chart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                admitId: searchParams.get("admitId"),
                ...formData
            })
        });
        let result = await response.json();
        if (result.status === "success") {
          setDrugData([...drugData, { ...formData }]);
          setModalOpen(false);
        } else {
            alert("Error occured");
            console.log(result);
        }
    
  
  };

  return (
    <div className="main-container">
    <div>
       <h2>Patient Name: {searchParams.get("name")}</h2>
      <h2>Drug Chart</h2>


      <button onClick={handleModalOpen}>Add Drug Entry</button>

    
      <h3>Drug Entries</h3>
      <table className="drug-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Drug Name</th>
            <th>Instruction</th>
            <th>Time</th>
            <th>Route</th>
            <th>Dose</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {drugData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.drug}</td>
              <td>{entry.instruction}</td>
              <td>{entry.time}</td>
              <td>{entry.route}</td>
              <td>{entry.dose}</td>
              <td>{entry.frequency}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Drug Entry Modal */}
      {modalOpen && (
        <div className="modal-overlay">

          <div className="modal-content">

            <h3>Add Drug Entry</h3>
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} />

            <label>Drug Name:</label>
            <input type="text" name="drug" value={formData.drug} onChange={handleInputChange} />

            <label>Instruction:</label>
            <textarea name="instruction" value={formData.instruction} onChange={handleInputChange} />

            <label>Time:</label>
            <input type="text" name="time" value={formData.time} onChange={handleInputChange} />

            <label>Route:</label>
            <input type="text" name="route" value={formData.route} onChange={handleInputChange} />

            <label>Dose:</label>
            <input type="text" name="dose" value={formData.dose} onChange={handleInputChange} />

            <label>Frequency:</label>
            <input type="text" name="frequency" value={formData.frequency} onChange={handleInputChange} />

            <div className="modal-actions">
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default DrugChart;
