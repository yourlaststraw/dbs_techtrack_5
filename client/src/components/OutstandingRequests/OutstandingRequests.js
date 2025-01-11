import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./OutstandingRequests.scss";

const OutstandingRequests = () => {
  // hardcoded test data
  const [outstandingRequests, setOutstandingRequests] = useState([{request_date: "date", company_name: "company_name", carbon_price: "carbon_price", carbon_quantity: "quantity", reason: "Reason", type: "type"}]);
  
  /*useEffect(() => {
    axios
      .get(`${getBaseURL()}api/cart/${customerId}`)
      .then((res) => {
        let productsInCart = res.data;
        setCartProducts(productsInCart);
      })
      .catch((err) => console.log("Error occurred"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cartProducts]);*/

  const [checked, setChecked] = useState([]);
  const onCheckedChange = (id, checkType) => {
    if (checkType) {
      setChecked([...checked, id]);
    } else {
      setChecked(checked.filter(x => x != id));
    }
  }

  return (
    <>
          <h1>Outstanding Requests from Companies</h1>
          <div>
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
                {outstandingRequests.map((request) => (
                  <tr>
                    <td><input type="checkbox" onChange={(e) => onCheckedChange(request.id, e.target.checked)}/></td>
                    <td>{request.request_date}</td>
                    <td>{request.company_name}</td>
                    <td>{request.carbon_price}</td>
                    <td>{request.carbon_quantity}</td>
                    <td>{request.reason}</td>
                    <td>{request.type}</td>
                    <td>
                      <div className="address-container">
                        <button className="accept-button"
                        >
                          Accept
                        </button>
                        <button className="reject-button">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </>
  );
};

export default OutstandingRequests;
