import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./Landing.scss"; // Import the CSS file




function Landing () {
  const [company, setCompany] = useState({
    companyName: '',
    cashBalance: 0,
    carbonBalance: 0
  })

  async function getBalance() {
    const config = {
      headers:{
        'x-auth-token': localStorage.getItem('jwt_token')
      }
    }
    const res = await axios.get('http://localhost:8747/api/get-balances/company-details', config)
    console.log("res", res)
    setCompany({
      companyName: res.data.companyName,
      cashBalance: res.data.cashBalance,
      carbonBalance: res.data.carbonBalance
    })
  }

  useEffect(()=> {
    getBalance()
  }, [])
  console.log(company)
  return (
    

    <div >
      <h1 className="company_name">{company.companyName}</h1>

      <div className = "company_info">
        <div className = "carbon_credits">
              <label>Carbon Credits</label>
              <h2 className = "cc_number">{company.carbonBalance}</h2>
          </div>
              
          <div className = "cash_balances">
              <label>Cash Balances (SGD)</label>
              <h2 className = "cb_number">{company.cashBalance}</h2>
          </div>

      </div>


    </div>


  )
      
};

export default Landing;
