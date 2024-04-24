const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res)=>{
    try {
        const { username, email, phone, password } = req.body;
        if(!username ||!email ||!phone ||!password){
            return res.status(400).json({ message: 'All fields are required!' });
        }
        const existingUser = await User.findOne({
            where:[
                { email: email } || { phone: phone }
            ]
        });
        if(existingUser){
            const existingFields = [];
            if(existingUser.email === email) existingFields.push('email');
            if(existingUser.phone === phone) existingFields.push('phone');
            return res.status(403).json({
                message: `The following field(s) already exist: ${existingFields.join(', ')}.`
            });
        }
        const hashedPassword = await bcrypt.hash(password, 15);
        const user = await User.create({
            username,
            email,
            phone,
            password: hashedPassword
        });
        return res.status(201).json({message: 'User created successfully', user});
}catch(err){
    console.log(err.message);
    res.status(500).json({ message: 'Internal server error' });
}
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET, // Use process.env.JWT_SECRET to access the secret key
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports ={
    registerUser,
    login
}