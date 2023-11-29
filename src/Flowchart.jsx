import React from 'react'

function Flowchart() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    date: '',
    clinicalNotes: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData([...tableData, formData]);
    setFormData({
      date: '',
      clinicalNotes: '',
      treatment: '',
    });
    setIsModalOpen(false); // Close the modal after submission
  };

  useEffect(() => {
    console.log('Form data submitted:', formData);
  }, [formData]);

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
                  name="clinicalNotes"
                  value={formData.clinicalNotes}
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
                {data.clinicalNotes}
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


  

export default Flowchart