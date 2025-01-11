import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./Landing.scss"; // Import the CSS file


function Landing () {
  return (

    <div >
      <h1 className="company_name">Company Name</h1>

      <div className = "company_info">
        <div className = "carbon_credits">
              <label>Carbon Credits</label>
              <h2 className = "cc_number">1234</h2>
          </div>
              
          <div className = "cash_balances">
              <label>Cash Balances (SGD)</label>
              <h2 className = "cb_number">$123456</h2>
          </div>

      </div>


    </div>


  )
      
};

export default Landing;
