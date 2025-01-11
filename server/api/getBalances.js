import express from 'express';
import CompanyAccount from '../models/companyAccount.js'; // Adjust the path as needed
import { verifyToken } from '../middleware/jwtAuth.js'

const router = express.Router();

// GET request to retrieve company details by companyName
router.get('/company-details', verifyToken, async (req, res) => {
    try {
        const companyId = req.company.id; // Extract companyName from the request body

        if (!companyId) {
            return res.status(400).json({ message: "companyName not present" });
        }

        // Find the company by companyName
        const company = await CompanyAccount.findOne(
            
            { _id: companyId }, // Query to find the company by name
            'companyName cashBalance carbonBalance' // Fields to include in the result
        );

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        // Respond with the company data
        res.status(200).json(company);
    } catch (error) {
        console.error("Error retrieving company details:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
