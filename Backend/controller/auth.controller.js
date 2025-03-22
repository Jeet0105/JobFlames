import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Company from "../model/Company.model.js";
import JobSeeker from "../model/JobSeeker.model.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let user = await JobSeeker.findOne({ email });
        console.log('user: ', user);
        let role = user ? "jobseeker" : null;

        if (!user) {
            user = await Company.findOne({ email });
            role = user ? "company" : null;
        }

        if (!user) {
            return res.status(404).json({ message: "User does not exist. Please register first." });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials. Please check your email or password." });
        }

        const { password: pass, ...rest } = user._doc;

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin, role },
            process.env.JWT_SECRET,
            { expiresIn: "5h" }
        );

        console.log('{ ...rest, role }: ', { ...rest, role });
        return res
            .status(200)
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .json({ ...rest, role });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

export const logout = (req, res) => {
    try {
        return res
            .status(200)
            .clearCookie("access_token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" })
            .json({ message: "Logged out successfully." });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};