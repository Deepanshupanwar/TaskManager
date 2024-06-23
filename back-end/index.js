const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'https://task-manager-cyan-psi.vercel.app', 
  credentials: true
}));
app.use(express.json());
app.use(cookieparser());
app.get("/api", (req, res)=>{
  console.log("working")
  res.send("hello world");
})
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server Is Running");
  });