import bcryptjs from 'bcryptjs';
import Company from "../model/Company.model.js";

export const register = async (req, res) => {    
    const { name, email, password, contact_no } = req.body;
    console.log(name,email,password,contact_no);
    
    if (!name || !email || !password || !contact_no) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(contact_no)) {
        return res.status(400).json({ message: "Please enter a valid phone number." });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
        });
    }

    try {
        const existedCompany = await Company.findOne({ email });
        if (existedCompany) {
            return res.status(400).json({ message: "Company with this email already exists." });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newCompany = new Company({
            name,
            password: hashedPassword,
            email,
            contact_no
        });

        await newCompany.save();
        
        return res.status(201).json({ message: "Company created successfully." });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};
