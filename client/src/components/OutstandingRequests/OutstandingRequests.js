import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import "./OutstandingRequests.scss";

const OutstandingRequests = () => {
  // hardcoded test data
  const [outstandingRequests, setOutstandingRequests] = useState([
    {
      id: 1,
      request_date: "date",
      company_name: "company_name",
      carbon_price: "carbon_price",
      carbon_quantity: "quantity",
      reason: "Reason",
      type: "type",
    },
    {
      id: 2,
      request_date: "date",
      company_name: "company_name",
      carbon_price: "carbon_price",
      carbon_quantity: "quantity",
      reason: "Reason",
      type: "type",
    },
    {
      id: 3,
      request_date: "date",
      company_name: "company_name",
      carbon_price: "carbon_price",
      carbon_quantity: "quantity",
      reason: "Reason",
      type: "type",
    },
  ]);

  const [currRequest, setCurrRequest] = useState(null);
  const [showAccept, setShowAccept] = useState(false);
  const handleAccept = (request) => {
    setCurrRequest(request);
    setShowAccept(true);
  };
  const AcceptModal = () => (
    <div class="modal" hidden={!showAccept}>
      <div class="modal-content">
        <span class="close" onClick={() => setShowAccept(false)}>
          &times;
        </span>
        <h2>Accept Request?</h2>
        <table>
          <thead>
            <tr>
              <th>Request Date</th>
              <th>Company Name</th>
              <th>Carbon Price (SGD/Tonnes)</th>
              <th>Carbon Quantity</th>
              <th>Requesting Reason</th>
              <th>Request Type (Buy/Sell)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currRequest?.request_date}</td>
              <td>{currRequest?.company_name}</td>
              <td>{currRequest?.carbon_price}</td>
              <td>{currRequest?.carbon_quantity}</td>
              <td>{currRequest?.reason}</td>
              <td>{currRequest?.type}</td>
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          <button
            className="accept-button"
            //onClick={() => handleAcceptRequest(currRequest)}
          >
            Confirm
          </button>
          <button
            className="reject-button"
            onClick={() => setShowAccept(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const [showReject, setShowReject] = useState(false);
  const handleReject = (request) => {
    setCurrRequest(request);
    setShowReject(true);
  };
  const RejectModal = () => (
    <div class="modal" hidden={!showReject}>
      <div class="modal-content">
        <span class="close" onClick={() => setShowReject(false)}>
          &times;
        </span>
        <h2>Reject Request?</h2>
        <table>
          <thead>
            <tr>
              <th>Request Date</th>
              <th>Company Name</th>
              <th>Carbon Price (SGD/Tonnes)</th>
              <th>Carbon Quantity</th>
              <th>Requesting Reason</th>
              <th>Request Type (Buy/Sell)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currRequest?.request_date}</td>
              <td>{currRequest?.company_name}</td>
              <td>{currRequest?.carbon_price}</td>
              <td>{currRequest?.carbon_quantity}</td>
              <td>{currRequest?.reason}</td>
              <td>{currRequest?.type}</td>
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          <button
            className="accept-button"
            //onClick={() => handleRejectRequest(currRequest)}
          >
            Confirm
          </button>
          <button
            className="reject-button"
            onClick={() => setShowReject(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const [showAcceptSelected, setShowAcceptSelected] = useState(false);
  const handleAcceptSelected = () => {
    setShowAcceptSelected(true);
  };
  const AcceptSelectedModal = () => (
    <div class="modal" hidden={!showAcceptSelected}>
      <div class="modal-content">
        <span class="close" onClick={() => setShowAcceptSelected(false)}>
          &times;
        </span>
        <h2>Accept All Selected Requests?</h2>
        <div className="button-container">
          <button
            className="accept-button"
            //onClick={() => handleAcceptRequest(currRequest)}
          >
            Confirm
          </button>
          <button
            className="reject-button"
            onClick={() => setShowAcceptSelected(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const [showRejectSelected, setShowRejectSelected] = useState(false);
  const handleRejectSelected = () => {
    setShowRejectSelected(true);
  };
  const RejectSelectedModal = () => (
    <div class="modal" hidden={!showRejectSelected}>
      <div class="modal-content">
        <span class="close" onClick={() => setShowRejectSelected(false)}>
          &times;
        </span>
        <h2>Reject All Selected Requests?</h2>
        <div className="button-container">
          <button
            className="accept-button"
            //onClick={() => handleAcceptRequest(currRequest)}
          >
            Confirm
          </button>
          <button
            className="reject-button"
            onClick={() => setShowRejectSelected(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const [showOverdue, setShowOverdue] = useState(true);
  const OverdueModal = () => (
    <div class="modal" hidden={!showOverdue}>
      <div class="modal-content">
        <span class="close" onClick={() => setShowOverdue(false)}>
          &times;
        </span>
        <h2>Overdue Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Request Date</th>
              <th>Company Name</th>
              <th>Carbon Price (SGD/Tonnes)</th>
              <th>Carbon Quantity</th>
              <th>Requesting Reason</th>
              <th>Request Type (Buy/Sell)</th>
            </tr>
          </thead>
          <tbody>
            {outstandingRequests?.map((request) => 
              <tr>
                <td>{request?.request_date}</td>
                <td>{request?.company_name}</td>
                <td>{request?.carbon_price}</td>
                <td>{request?.carbon_quantity}</td>
                <td>{request?.reason}</td>
                <td>{request?.type}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

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
      setChecked(checked.filter((x) => x != id));
    }
  };

  return (
    <>
      <AcceptModal />
      <RejectModal />
      <AcceptSelectedModal />
      <RejectSelectedModal />
      <OverdueModal />
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
              <tr key={request.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      onCheckedChange(request.id, e.target.checked)
                    }
                  />
                </td>
                <td>{request.request_date}</td>
                <td>{request.company_name}</td>
                <td>{request.carbon_price}</td>
                <td>{request.carbon_quantity}</td>
                <td>{request.reason}</td>
                <td>{request.type}</td>
                <td>
                  <div className="button-container">
                    <button
                      className="accept-button"
                      onClick={() => handleAccept(request)}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleReject(request)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button className="accept-button" onClick={handleAcceptSelected}>
          Accept Selected
        </button>
        <button className="reject-button" onClick={handleRejectSelected}>
          Reject Selected
        </button>
      </div>
    </>
  );
};

export default OutstandingRequests;
