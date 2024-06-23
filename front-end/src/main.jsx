import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import TodoPage from './Pages/TodoPage.jsx'
import './index.css';
import { UserContextProvider } from './UserContext.jsx'
import { RouterProvider, createBrowserRouter} from 'react-router-dom';

const router = createBrowserRouter([
  {path:"/",
  element: <TodoPage/>
  },
  {path:"/login",
  element: <Login/>
  },
  {path:"/register",
  element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} /> 
    </UserContextProvider>

  </React.StrictMode>,
)
