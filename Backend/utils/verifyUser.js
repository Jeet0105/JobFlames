import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.access_token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden. Invalid or expired token." });
        }

        req.user = decodedUser;
        next();
    });
};
