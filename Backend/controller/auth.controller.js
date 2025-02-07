import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import Company from '../model/Company.model.js';
import JobSeeker from '../model/JobSeeker.model.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        let user = await JobSeeker.findOne({ email });
        let role = "jobseeker";

        if (!user) {
            user = await Company.findOne({ email });
            role = user ? "company" : null;
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const { password: pass, ...rest } = user._doc;

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin, role },
            process.env.JWT_SECRET,
            { expiresIn: '5h' }
        );

        return res.status(200).cookie('access_token', token, { httpOnly: true, }).json({...rest,role});

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};