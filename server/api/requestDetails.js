import express from "express";
import OutstandingRequest from "../models/outstandingRequest.js";
import { verifyToken } from '../middleware/jwtAuth.js'

const router = express.Router();

// GET Request to retrieve outstanding requests for a specific company
router.get("/outstanding-requests", verifyToken, async (req, res) => {
  try {
    
    const companyId = req.company.id;

    // Validate if companyId exists
    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    // Query the database
    const outstandingRequests = await OutstandingRequest.find({ companyId })
      .populate("companyId", "companyName") 
      .select(
        "requestDate carbonUnitPrice carbonQuantity requestReason requestType"
      ); 

    // Check if no outstanding requests were found
    if (!outstandingRequests || outstandingRequests.length === 0) {
      return res.status(404).json({ message: "No outstanding requests found" });
    }

    // Respond with the outstanding requests
    res.status(200).json(outstandingRequests);
  } catch (error) {
    console.error("Error retrieving outstanding requests:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/outstanding-requests", async (req, res) => {
    try {
      const {
        companyId,
        requestDate,
        carbonUnitPrice,
        carbonQuantity,
        requestReason,
        requestType,
      } = req.body;
  
      // Validate required fields
      if (
        !companyId ||
        !requestDate ||
        !carbonUnitPrice ||
        !carbonQuantity ||
        !requestReason ||
        !requestType
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Create a new request in the OutstandingRequest table
      const newRequest = new OutstandingRequest({
        companyId,
        requestDate,
        carbonUnitPrice,
        carbonQuantity,
        requestReason,
        requestType,
      });
  
      const savedRequest = await newRequest.save();
  
      
      const receivedRequest = new RequestReceived({
        requestId: savedRequest._id, 
        alertDatetime: new Date(), 
        alertText: `New request created: ${requestType} ${carbonQuantity} units at ${carbonUnitPrice} SGD/tonne`, // Create an alert text
        alertStatus: "Pending", 
        alertViewDate: null, 
        createdDatetime: new Date(), 
        updatedDatetime: new Date(), 
      });
  
      const savedReceivedRequest = await receivedRequest.save();
  
      res.status(201).json({
        message: "Request created successfully",
        request: savedRequest,
        receivedRequest: savedReceivedRequest,
      });
    } catch (error) {
      console.error("Error creating request:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  
  router.put("/outstanding-requests/:id", async (req, res) => {
    try {
      const { id } = req.params; // Get the request ID from the URL
      const { carbonUnitPrice, carbonQuantity, requestReason, requestType } = req.body;
  
      // Validate that at least one field is being updated
      if (!carbonUnitPrice && !carbonQuantity && !requestReason && !requestType) {
        return res.status(400).json({ message: "No fields to update provided" });
      }
  
      // Find and update the request
      const updatedRequest = await OutstandingRequest.findByIdAndUpdate(
        id,
        { carbonUnitPrice, carbonQuantity, requestReason, requestType },
        { new: true, runValidators: true } 
      );
  
      if (!updatedRequest) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      res.status(200).json({ message: "Request updated successfully", request: updatedRequest });
    } catch (error) {
      console.error("Error updating request:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

  router.delete("/outstanding-requests/:id", async (req, res) => {
    try {
      const { id } = req.params; 
  
      
      const deletedRequest = await OutstandingRequest.findByIdAndDelete(id);
  
      if (!deletedRequest) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      
      await RequestReceived.deleteMany({ requestId: id });
  
      res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
      console.error("Error deleting request:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

export default router;
