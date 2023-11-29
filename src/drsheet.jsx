import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";

const DrSheet = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    date: '',
    note: '',
    treatment: '',
  });

  const [tableData, setTableData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:8081/add_dr_sheet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                admitId: searchParams.get("admitId"),
                date: formData.date,
                note: formData.note,
                treatment: formData.treatment
            })
        });
        let result = await response.json();
        if (result.status === "success") {
          setTableData([...tableData, formData]);
          setFormData({
            date: '',
            note: '',
            treatment: '',
          });
          setIsModalOpen(false);
        } else {
            alert("Error occured");
            console.log(result);
        }
  };

  useEffect(() => {
    // console.log('Form data submitted:', formData);
    (async function(){let response = await fetch("http://localhost:8081/get_dr_sheet", {
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
          setTableData(result.data);
          console.log(result);
        } else {
            alert("Error occured");
            console.log(result);
        }})()
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Patient Name: {searchParams.get("name")}</h2>
      <button type="button" onClick={handleOpenModal}>
        Open Form
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
            }}
          >
            <h2 style={{ textAlign: 'center' }}>DrSheet</h2>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label>Date:</label>
                <input
                  type="date"
                  style={{ width: '100%' }}
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Clinical Notes:</label>
                <input
                  type="text"
                  style={{ width: '100%' }}
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Treatment:</label>
                <input
                  type="text"
                  style={{ width: '100%' }}
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" style={{ width: '100%' }}>
                Submit
              </button>
            </form>

            {/* Close button */}
            <button
              style={{ width: '100%', marginTop: '20px' }}
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <table
        style={{
          width: '100%',
          marginTop: '20px',
          borderCollapse: 'collapse',
          border: '2px solid #ddd', // Border color
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Clinical Notes
            </th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Treatment
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {data.date}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {data.note}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {data.treatment}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrSheet;
