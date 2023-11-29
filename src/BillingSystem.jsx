import React, { useEffect, useState } from 'react';
import './BillingSystem.css';
import { useSearchParams } from 'react-router-dom';

const BillingSystem = () => {

  const [searchParams, setSearchParams]  = useSearchParams();
  const [data, setPatientData] = useState([]);

  const [admissionFees, setAdmissionFees] = useState('');
  const [consultationFees, setConsultationFees] = useState('');
  const [roomCharge, setRoomCharge] = useState('');
  const [doctorFees, setDoctorFees] = useState('');
  const [nurseFee, setNurseFee] = useState('');
  const [oxygenCharge, setOxygenCharge] = useState('');
  const [ventilatorCharge, setVentilatorCharge] = useState('');
  const [nebulizerCharge, setNebulizerCharge] = useState('');
  const [glucoseCharge, setGlucoseCharge] = useState('');
  const [processingCharge, setProcessingCharge] = useState('');
  const [feedingCharge, setFeedingCharge] = useState('');
  const [monitoringCharge, setMonitoringCharge] = useState('');
  const [lelanCharge, setLelanCharge] = useState('');
  const [photoTherapyCharge, setPhotoTherapyCharge] = useState('');
  const [otherCharges, setOtherCharges] = useState('');
  const [day, setDay] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    (async function () {
        const response = await fetch("http://localhost:8081/get_admit",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ admitId: searchParams.get('admitId')})
          }
        );
        const json = await response.json();
        console.log(json);
        setPatientData(json.data);
    })();
}, []);

  const calculateTotalCost = () => {
    const admissionFeesCost = parseFloat(admissionFees) || 0;
    const consultationFeesCost = parseFloat(consultationFees) || 0;
    const roomChargeCost = parseFloat(roomCharge) || 0;
    const doctorFeesCost = parseFloat(doctorFees) || 0;
    const nurseFeeCost = parseFloat(nurseFee) || 0;
    const oxygenChargeCost = parseFloat(oxygenCharge) || 0;
    const ventilatorChargeCost = parseFloat(ventilatorCharge) || 0;
    const nebulizerChargeCost = parseFloat(nebulizerCharge) || 0;
    const glucoseChargeCost = parseFloat(glucoseCharge) || 0;
    const processingChargeCost = parseFloat(processingCharge) || 0;
    const feedingChargeCost = parseFloat(feedingCharge) || 0;
    const monitoringChargeCost = parseFloat(monitoringCharge) || 0;
    const lelanChargeCost = parseFloat(lelanCharge) || 0;
    const photoTherapyChargeCost = parseFloat(photoTherapyCharge) || 0;
    const otherChargesCost = parseFloat(otherCharges) || 0;
    const dayValue = parseFloat(day) || 0;

    const calculatedTotalCost =
      (admissionFeesCost +
        consultationFeesCost +
        roomChargeCost +
        doctorFeesCost +
        nurseFeeCost +
        oxygenChargeCost +
        ventilatorChargeCost +
        nebulizerChargeCost +
        glucoseChargeCost +
        processingChargeCost +
        feedingChargeCost +
        monitoringChargeCost +
        lelanChargeCost +
        photoTherapyChargeCost +
        otherChargesCost) *
      dayValue;
    setTotalCost(calculatedTotalCost);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="main-container">
      <h1>Billing System</h1>

      <table className="billing-table">
        <thead>
          <tr className="header-row">
            <th colSpan="4" className="header-cell">
              <div style={{display: "flex", justifyContent: "space-between"}}>
                <div className="doctor-info" style={{ textAlign: 'left' }}>
                  <div>Dr. Paresh Thakar</div>
                  <div>MD. DCH (G13244)</div>
                  <div>Pediatrician & Neonatologist</div>
                  <div>Shree Kheteshwar Complex,</div>
                  <div>Opp. Ravji Dada Temple,</div>
                  <div>Ten Road, Bardoli-394601.</div>
                  <div>Mo. 94089 58925, 94089 59775</div>
                </div>
                <img src="./logo.jpg" alt="Hospital Logo" className="logo" />
              </div>
            </th>
          </tr>
          <tr className="patient-details">
            <td colSpan="4" className="patient-details-cell">
              Patient Name: {searchParams.get('name')} &nbsp;
              Bill No: {searchParams.get('admitId') } &nbsp;
              Patient ID: {parseInt(searchParams.get("patientId"))+1}
            </td>
          </tr>
          <tr className="patient-details">
            <td colSpan="4" className="patient-details-cell">
              Admitted Date: {data.admitDate} &nbsp;
              Discharge Date:{data.dischargeDate}
            </td>
          </tr>
          <tr className="table-header">
            <th className="detail-cell"><strong>Details</strong></th>
            <th className="detail-cell">Charge</th>
            <th className="detail-cell">Day</th>
            <th className="detail-cell">TotalCost</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row room-charge-row">
            <td className="table-cell">Admission Fees</td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '80px' }}
                value={admissionFees}
                onChange={(e) => setAdmissionFees(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '40px' }}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell total-cell">{(parseFloat(admissionFees) * parseFloat(day)) || 0}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">ConsultationFees</td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '80px' }}
                value={consultationFees}
                onChange={(e) => setConsultationFees(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '40px' }}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell total-cell">{(parseFloat(consultationFees) * parseFloat(day)) || 0}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Room Charge</td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '80px' }}
                value={roomCharge}
                onChange={(e) => setRoomCharge(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '40px' }}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell total-cell">{(parseFloat(roomCharge) * parseFloat(day)) || 0}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Doctor Fees</td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '80px' }}
                value={doctorFees}
                onChange={(e) => setDoctorFees(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '40px' }}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell total-cell">{(parseFloat(doctorFees) * parseFloat(day)) || 0}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">Nurse Fee</td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '80px' }}
                value={nurseFee}
                onChange={(e) => setNurseFee(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '40px' }}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell total-cell">{(parseFloat(nurseFee) * parseFloat(day)) || 0}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">OxygenCharge</td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '80px' }}
                value={oxygenCharge}
                onChange={(e) => setOxygenCharge(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '40px' }}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell total-cell">{(parseFloat(oxygenCharge) * parseFloat(day)) || 0}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">VentilatorCharges</td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '80px' }}
                value={ventilatorCharge}
                onChange={(e) => setVentilatorCharge(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '40px' }}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell total-cell">{(parseFloat(ventilatorCharge) * parseFloat(day)) || 0}</td>
          </tr>
          {/* Add similar rows for Nebulizer, Glucose, Processing, Feeding, Monitoring, Lelan, Photo Therapy, Other */}
          <tr className="table-row">
            <td className="table-cell">NebulizerCharges</td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '80px' }}
                value={nebulizerCharge}
                onChange={(e) => setNebulizerCharge(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '40px' }}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell total-cell">{(parseFloat(nebulizerCharge) * parseFloat(day)) || 0}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">GlucoseCharges</td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '80px' }}
                value={glucoseCharge}
                onChange={(e) => setGlucoseCharge(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '40px' }}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell total-cell">{(parseFloat(glucoseCharge) * parseFloat(day)) || 0}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">ProcessingCharges</td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '80px' }}
                value={processingCharge}
                onChange={(e) => setProcessingCharge(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '40px' }}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell total-cell">{(parseFloat(processingCharge) * parseFloat(day)) || 0}</td>
          </tr>
          <tr className="table-row">
            <td className="table-cell">FeedingCharges</td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '80px' }}
                value={feedingCharge}
                onChange={(e) => setFeedingCharge(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell">
              <input
                type="text"
                style={{ width: '40px' }}
                value={day}
                onChange={(e) => setDay(e.target.value)}
                onBlur={calculateTotalCost}
              />
            </td>
            <td className="table-cell total-cell">{(parseFloat(feedingCharge) * parseFloat(day)) || 0}</td>
          </tr>
          <tr className="table-row">
  <td className="table-cell">Monitoring Charges</td>
  <td className="table-cell">
    <input
      type="text"
      style={{ width: '80px' }}
      value={monitoringCharge}
      onChange={(e) => setMonitoringCharge(e.target.value)}
      onBlur={calculateTotalCost}
    />
  </td>
  <td className="table-cell">
    <input
      type="text"
      style={{ width: '40px' }}
      value={day}
      onChange={(e) => setDay(e.target.value)}
      onBlur={calculateTotalCost}
    />
  </td>
  <td className="table-cell total-cell">{(parseFloat(monitoringCharge) * parseFloat(day)) || 0}</td>
</tr>

<tr className="table-row">
  <td className="table-cell">Lelan Charge</td>
  <td className="table-cell">
    <input
      type="text"
      style={{ width: '80px' }}
      value={lelanCharge}
      onChange={(e) => setLelanCharge(e.target.value)}
      onBlur={calculateTotalCost}
    />
  </td>
  <td className="table-cell">
    <input
      type="text"
      style={{ width: '40px' }}
      value={day}
      onChange={(e) => setDay(e.target.value)}
      onBlur={calculateTotalCost}
    />
  </td>
  <td className="table-cell total-cell">{(parseFloat(lelanCharge) * parseFloat(day)) || 0}</td>
</tr>

<tr className="table-row">
  <td className="table-cell">Photo Therapy Charge</td>
  <td className="table-cell">
    <input
      type="text"
      style={{ width: '80px' }}
      value={photoTherapyCharge}
      onChange={(e) => setPhotoTherapyCharge(e.target.value)}
      onBlur={calculateTotalCost}
    />
  </td>
  <td className="table-cell">
    <input
      type="text"
      style={{ width: '40px' }}
      value={day}
      onChange={(e) => setDay(e.target.value)}
      onBlur={calculateTotalCost}
    />
  </td>
  <td className="table-cell total-cell">{(parseFloat(photoTherapyCharge) * parseFloat(day)) || 0}</td>
</tr>

<tr className="table-row">
  <td className="table-cell">Other Charges</td>
  <td className="table-cell">
    <input
      type="text"
      style={{ width: '80px' }}
      value={otherCharges}
      onChange={(e) => setOtherCharges(e.target.value)}
      onBlur={calculateTotalCost}
    />
  </td>
  <td className="table-cell">
    <input
      type="text"
      style={{ width: '40px' }}
      value={day}
      onChange={(e) => setDay(e.target.value)}
      onBlur={calculateTotalCost}
    />
  </td>
  <td className="table-cell total-cell">{(parseFloat(otherCharges) * parseFloat(day)) || 0}</td>
</tr>

<tr className="table-row">
  <td colSpan="3" className="table-cell total-cell">Grand Total</td>
  <td className="table-cell total-cell">{totalCost}</td>
</tr>
          
          
          

        </tbody>
      </table>

      <button onClick={handlePrint} style={{ marginTop: '20px' }}>
        Print Bill
      </button>
    </div>
  );
};

export default BillingSystem;
