import express from "express";
import RequestReceived from "../models/requestReceived.js";
import { verifyToken } from '../middleware/jwtAuth.js'

const router = express.Router();

// GET Request to retrieve outstanding requests for a specific company

router.get("/requests-received", verifyToken, async (req, res) => {
    try {

        const companyId = req.company.id;

        // Validate if companyId exists
        if (!companyId) {
            return res.status(400).json({ message: "Company ID is required" });
        }

        // Query the database
        const requestsReceived = await requestReceived.find({ _id : companyId })
            .populate("companyId", "companyName")
            .select(
                "requestId alertDatetime alertText alertStatus alertViewDate"
            );

        // Check if no outstanding requests were found
        if (!requestsReceived || requestsReceived.length === 0) {
            return res.status(404).json({ message: "No requests received" });
        }

        // Respond with the outstanding requests
        res.status(200).json(requestsReceived);
    } catch (error) {
        console.error("Error retrieving requests received:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;