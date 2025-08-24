import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import genToken from "../config/token.js"

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        if (password.lenght < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const hashPassword = await bcryptjs.hash(password, 10)

        const user = await User.create({ name, email, password: hashPassword })
        
        const token = genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "strict",
            secure: false
        })

        return res.status(201).json({ message: "User created successfully", user})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Sign In Error" })    
    }
}

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        
        if (!user) {
            return res.status(400).json({ message: "User not exist" })
        }

        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }


        const token = genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "strict",
            secure: false
        })

        return res.status(200).json({ message: "User logged in successfully", user})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Login Error" })    
    }
}

const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "User logged out successfully" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Logout Error" })       
    }
}

export { signUp, logIn, logOut }