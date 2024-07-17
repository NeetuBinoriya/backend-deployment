import jwt from "jsonwebtoken"
import { User } from "../Models/User.js";


export const isAuthenticated = async (req, res, next) => {
    const token = req.header("Auth");
    if (!token) return res.json({ message: "Login First....!" });
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_SC);
        // res.json(verifyToken)
        const userId = verifyToken.userId;

        const user = await User.findById(userId);

        if (!user) return res.json({ message: "User not Exist" });

        req.user = user;

        next()
    } catch (error) {
        res.json({ message: error.message })
    }



}