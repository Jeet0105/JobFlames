import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. No token provided." });
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please log in again." });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "Invalid token. Authentication failed." });
        }

        return res.status(500).json({ message: "Internal server error." });
    }
};
