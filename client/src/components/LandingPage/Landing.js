import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./Landing.scss"; // Import the CSS file


function Landing () {

  const [companyInfo, setcompanyInfo] = useState({
    company_name: "ABC Pte Ltd",
    carbon_credits: "3456",
    cash_balance: "11343"
  });

  const [companyRequests, setcompanyRequests] = useState([{
    request_date: "2025-01-11 09:01:02", 
    company_name: "Sanford - Bruen", 
    carbon_price: "201799", 
    carbon_quantity: "541", 
    reason: "Projected excess carbon credits for 2025", 
    type: "BUY"}, 

    {
      request_date: "2024-10-22 09:01:02", 
      company_name: "ABC Company", 
      carbon_price: "123456", 
      carbon_quantity: "4546", 
      reason: "Projected excess carbon credits for 2024", 
      type: "SELL"}]  )

    const [checked, setChecked] = useState([]);
    const onCheckedChange = (id, checkType) => {
      if (checkType) {
        setChecked([...checked, id]);
      } else {
        setChecked(checked.filter(x => x != id));
      }
    }

    // const typeColor = 

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };


  const [formData, setFormData] = useState({
      request_name: '',
      request_type: '',
      carbon_price: '',
      carbon_quantity: '',
      request_reason:'',
      request_date:''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
    
    }
    
    return (
      // <p>test</p>

    <div >

      <h1 className="company_name">{companyInfo.company_name}</h1>
      <div className = "company_info">
        <div className = "carbon_credits">
              <label>Carbon Credits</label>
              <h2 className = "cc_number">{companyInfo.carbon_credits}</h2>
          </div>
              
          <div className = "cash_balances">
              <label>Cash Balances (SGD)</label>
              <h2 className = "cb_number">${companyInfo.cash_balance}</h2>
          </div>

      </div>

      <h2>Create New Request</h2>
      <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Request Date</th>
                  <th>Company Name</th>
                  <th>Carbon Price (SGD/Tonnes)</th>
                  <th>Carbon Quantity</th>
                  <th>Requesting Reason</th>
                  <th>Request Type (Buy/Sell)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {companyRequests.map((request) => (
                  <tr>
                    <td><input type="checkbox" onChange={(e) => onCheckedChange(request.id, e.target.checked)}/></td>
                    <td>{request.request_date}</td>
                    <td>{request.company_name}</td>
                    <td>{request.carbon_price}</td>
                    <td>{request.carbon_quantity}</td>
                    <td>{request.reason}</td>
                    <td className = "request_color">{request.type}</td>
                    <td>
                      <div className="address-container">
                        <button className="accept-button"
                        >
                          Edit
                        </button>
                        <button className="reject-button">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

      <div className = "create_form">

      <div>
        <button className='accept-button' onClick={handleOpen}>Create New Request</button>
      
      </div>
              
      <div className = "form_content">
        <div className='modal-content'>
          <span  onClick={handleClose}/>
          <form>

          <label>
            Request Date
            <input 
            type = "text"
            placeholder = "Request Date"
            value = {formData.request_date}
            onChange = {handleChange}
            />
          </label>

          <label>
            Company Name 
            <input 
            type = "text"
            placeholder = "Company Name"
            value = {formData.company_name}
            onChange = {handleChange}
            />
          </label>

          <label>
            Carbon Price
            <input 
            type = "text"
            placeholder = "Carbon Price"
            value = {formData.carbon_price}
            onChange = {handleChange}
            />
          </label>

          <label>
            Quantity
            <input 
            type = "text"
            placeholder = "Carbon Quantity"
            value = {formData.carbon_quantity}
            onChange = {handleChange}
            />
          </label>

          <label>
            Reason
            <input 
            type = "text"
            placeholder = "Reason"
            value = {formData.request_reason}
            onChange = {handleChange}
            />
          </label>

          <label>
            Type
            <input 
            type = "text"
            placeholder = "Type"
            value = {formData.request_type}
            onChange = {handleChange}
            />
          </label>

          <button>Submit</button>
        </form>    


        </div>

    </div>
    </div>


    </div>
  
  )
}

export default Landing;
