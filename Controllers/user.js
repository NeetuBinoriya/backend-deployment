import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email })
    if (user) return res.json({ message: "User Already Registered", success: true })

    let hashpassword = await bcrypt.hash(password, 10)

    user = await User.create({ name, email, password: hashpassword })
    res.json({ message: "User register Successfully...!", success: true, user });
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) return res.json({ messgae: "User Not Exist...", success: false });

    let validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.json({ message: "Invalid Credential", success: false });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SC, {
        expiresIn: '365d',
    });

    res.json({ message: `Welcome ${user.name}`, success: true, token });

}

