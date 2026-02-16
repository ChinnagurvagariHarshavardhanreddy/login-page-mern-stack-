import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import login from './db.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
const app = express()
const PORT = 3000
const SALT_ROUNDS = 10
dotenv.config()
// Middleware
app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('✓ Connected to MongoDB')
    } catch (err) {
        console.error('✗ MongoDB connection error:', err.message)
        process.exit(1)
    }
}

// Route: Register/Create user
app.post('/', async (req, res) => {
    try {
        const { email, password } = req.body.form
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Email and password are required' 
            })
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        // Create user in database
        const newUser = await login.create({
            email,
            password: hashedPassword
        })
        
        res.status(201).json({ 
            message: 'User created successfully',
            user: { email: newUser.email, id: newUser._id }
        })
    } catch (err) {
        console.error('Error creating user:', err.message)
        res.status(500).json({ 
            error: 'Failed to create user',
            details: err.message 
        })
    }
})

// Start server
async function start() {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`✓ Server listening on port ${PORT}`)
    })
}

start()