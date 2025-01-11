import express from "express";
const router = express.Router()
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import companyAccount from '../models/companyAccount.js'


// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post("/register", [
    check('companyName', 'Company Name is required').not().isEmpty(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { companyName, password } = req.body

    try {
        // Check if user already exists
        let company = await companyAccount.findOne({ companyName });
        if (company) {
            return res.status(400).json({
                errors:
                    [{ msg: "Comapny already exists" }]
            })
        }

        // Encrypt the password
        const salt = await bcrypt.genSalt()
        const hashedPw = await bcrypt.hash(password, salt)

        // Create new company object
        company = new companyAccount({
            companyName,
            password: hashedPw,
        })

        // Save to database
        await company.save()

        // Create and return JWT
        const payload = {
            company: {
                id: company.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_KEY,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                return res.json({ token })
            }
        )
    } catch (err) {
        console.log("Comapny Register route", err.message)
        return res.status(500).send('Server error')
    }


})

// @route   POST /api/auth/Login
// @desc    Login user & Get back JWT
// @access  Public
router.post('/login', [
    check("companyName", "Please enter name").not().isEmpty(),
    check("password", "Please enter password").not().isEmpty()
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { companyName, password } = req.body

        try {
            const company = await companyAccount.findOne({ companyName })
            if (!company) {
                return res.status(400).json({ msg: "Company doesn't exist" })
            }

            // Check password
            const isPasswordMatch = await bcrypt.compare(password, company.password)
            if (!isPasswordMatch) {
                return res.status(400).json({ msg: "Wrong password" })
            }

            // Create jwt payload
            const payload = {
                company: {
                    id: company.id
                }
            }

            // Create jwt token & return in callback
            jwt.sign(
                payload,
                process.env.JWT_KEY,
                { expiresIn: 360000 },
                (error, token) => {
                    if (error) throw error;
                    return res.json({ token })
                }

            )


        } catch (err) {
            console.error("Company Login route. ", err.message)
            res.status(500).send("Server Error")
        }
    })

export default router;
