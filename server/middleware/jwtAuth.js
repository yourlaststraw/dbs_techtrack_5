import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
    // Get token from header
    const token = req.header('x-auth-token')

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, not authorised' })
    }

    jwt.verify(token, process.env.JWT_KEY, async (error, decoded) => {
        if (error) {
            return response.status(403).send("Token is invalid");
        }
        request.company = decoded.company;
        /* jwt payload from register user route:
        decoded = {
            company: {
                id: company.id
            }
        }
        */

        req.company.id
        next();
    });
}