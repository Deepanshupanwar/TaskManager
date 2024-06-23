# TaskManager
The Task Manager App is a full-stack web application designed to help users manage their tasks efficiently. The app features user authentication, allowing users to register, log in, and manage their tasks (todos). Users can add, edit, delete, and view tasks, making it easy to keep track of their to-dos.

## Prerequisites
Node.js (>= 14.x)
MongoDB (Atlas or local instance)
npm (or yarn)

## Front-end

### Technologies Used:
React
React Router
React Hot Toast
Material UI
Tailwind

### Installation and Setup For local

```bash
git clone <repository-url>
cd front-end

npm install
npm run dev
```

### File Structure

```bash
src
├── Pages
│   ├── Login.jsx
│   ├── Register.jsx
│   └── TodoPage.jsx
├── UserContext.jsx
├── index.css
├── main.jsx
└── App.jsx
```

## Back-end

### Technologies Used
Node.js
Express.js
MongoDB
Mongoose
JWT (JsonWebToken)
bcryptjs
dotenv
cookie-parser
cors

### Setup Instructions

```bash

git clone https://github.com/yourusername/task-manager-backend.git
cd back-end

#create .env file
PORT=3000
DATABASE_URL=your_mongodb_connection_string
SECRET=your_jwt_secret

npm install
npm start

```
### File Structure

```bash
.
├── controllers
│   ├── todoController.js
│   └── userController.js
├── models
│   ├── todo.js
│   └── user.js
├── routes
│   ├── todoRoutes.js
│   └── userRoutes.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

##3 API Endpoints:
##User Authentication:
POST /api/user/register

Request Body: { "username": "string", "email": "string", "password": "string" }
Response: 200 OK with user data and JWT token
POST /api/user/login

Request Body: { "email": "string", "password": "string" }
Response: 200 OK with user data and JWT token
POST /api/user/logout


##Task (Todo) Management:
POST /api/todo/addTodo

Request Body: { "title": "string", "description": "string", "startDate": "date", "endDate": "date" }
Response: 200 OK with the list of todos
DELETE /api/todo/deleteTodo

Request Body: { "id": "todo_id" }
Response: 200 OK with the list of todos
PUT /api/todo/editTodo

Request Body: { "_id": "todo_id", "title": "string", "description": "string", "startDate": "date", "endDate": "date" }
Response: 200 OK with the list of todos
GET /api/todo/getTodo/

Request Params: id (User ID)


