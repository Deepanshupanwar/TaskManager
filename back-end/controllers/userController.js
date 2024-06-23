const UserModel = require("../models/user");
const { mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);

exports.registerUser = async (req, res) => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const { username, email, password } = req.body;
    
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await UserModel.create({
          username,
          email,
          password: hashedPassword,
        });
    
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {});
    
        return res.cookie('token', token, {
          sameSite: 'none',
          secure: true,
        }).json(newUser);

      } catch (error) {
        if (error.code === 11000) {
    
          return res.status(400).json({ error: "Duplicate email address" });
        } else {
    
          console.error("Error:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      }
}

exports.loginUser = async (req, res) => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const { email, password } = req.body;
        const user_data = await UserModel.findOne({ email });
        if (!user_data) {
          return res.status(404).json({ error: 'User not found' });
        }
        const password_check = bcrypt.compareSync(password, user_data.password);
        if (!password_check) {
          return res.status(401).json({ error: 'Incorrect password' });
        }
    
        const token = jwt.sign({ username:user_data.username , id: user_data.id }, process.env.SECRET, {});
    
        return res.cookie('token', token, {
          sameSite: 'none',
          secure: true,
        }).json(user_data);
        
      } catch (error) {
    
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    
}

exports.logout = async (req, res)=>{
  return res.cookie('token','').json('ok');
}