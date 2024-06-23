const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(express.json());
app.use(cookieparser());
app.get("/api", (req, res)=>{
  console.log("working")
})
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

app.listen(5000, () => {
    console.log("Server Is Running");
  });