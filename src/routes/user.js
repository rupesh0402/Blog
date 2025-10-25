import { Router} from "express";
import User from "../models/user.js";
import { generateToken } from "../services/authentication.js";

const router = Router();

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.get('/login', (req, res) => {
    return res.render('login');
});

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        await User.create({
            fullName,
            email,
            password
        });
        console.log("User registered successfully");
        return res.redirect('/user/login');
    } catch (error) {
        console.error("Signup failed:", error.message);
        return res.status(400).send("Signup failed: " + error.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send("Invalid email or password");
        }

        const token = generateToken(user);
        res.cookie('token', token, { httpOnly: true });
        console.log("User logged in successfully:", user.email);
        return res.redirect('/');
    } catch (error) {
        console.error("Login failed:", error.message);
        return res.status(500).send("Internal server error");
    }
});

export default router;