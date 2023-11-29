import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ShowDetails = ({ patient }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    async function getData() {
        let response = await fetch(
            "http://localhost:8081/get_details",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    patientId: searchParams.get("patientId")
                })
            }
        );
        let result = await response.json();
        if (result.status === "success") {
            console.log(new Date(result.admits[0].admitDate).toDateString());
            setData(result.admits)
        } else {
            alert("Error occured");
            console.log(result);
        }
    }
    getData();
}, []);

const handleTemperature = ( admitId) => {
  navigate(
      `/temperature?admitId=${admitId}&patientId=${searchParams.get("patientId")+1}&patientName=${searchParams.get("patientName")}`
  );
};
const handleDrSheet = (row) => {
    navigate(
        `/drsheet?admitId=${row._id}&name=${searchParams.get("patientName")}`
    );
};

  
  const handleDrugChart = (admitId) => {
    navigate(
        `/drugchart?admitId=${admitId}&name=${searchParams.get("patientName")}`
    );
  };
  return (
    <div>
      <h2>Patient Id:{parseInt(searchParams.get("patientId"))+1}</h2>
      <h2>Patient Name:{searchParams.get("patientName")}  </h2>   
    
      <table className="table">
                <thead>
                    <tr>
                        <th> Admited ID</th>
                     
                        <th>Admitted Date</th>
                        <td>discharge Dates</td>
                      
                        <th>Temperature</th>
                        <th>Dr.Sheet</th>
                        
                        <th>Drug chart </th>
                        
                   

                      
                       
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row._id + 1}</td>
                         
                         
                            <td>{new Date(row.admitDate).toDateString()}</td>
                            <td>{new Date(row.dischargeDate).toDateString()}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handleTemperature(
                                            row._id
                                        )
                                    }
                                >
                                    Check
                                </button>
                            </td>
                            <td>
                            <button onClick={() => handleDrSheet(
                                row)
                                
                                }
                                >Dr. Sheet</button>
                            </td>
                          

                         <td>
                         <button onClick={() => handleDrugChart(row._id)}>Drug Chart</button>
              
                         </td>
                        
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  );
};

export default ShowDetails;
