import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  TextField,
  Box,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  CssBaseline,
} from '@mui/material';
import { Delete, Edit, AddCircleOutline, Info } from '@mui/icons-material';
import { userContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {format} from "date-fns"
export default function TodoPage() {
  const {userInfo, setUserInfo ,todos, setTodos} = useContext(userContext)
  const [open, setOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ title: '', description: '', startDate: '', endDate: '' });
  const [viewOpen, setViewOpen] = useState(false);
  const [viewTodo, setViewTodo] = useState({ title: '', description: '', startDate: '', endDate: '' });

  const handleDelete = async (id) => {
    const response= await fetch('http://localhost:5000/api/todo/deleteTodo',
      {
        method: 'DELETE',
        body: JSON.stringify({id}),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      if(response.ok)
      {
        response.json().then(todos=> {
          setTodos(todos)
        })
        toast.success("task deleted");
      }
      else{
        toast.error("internal server error")
      }
  };

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTodo({ title: '', description: '', startDate: '', endDate: '' });
  };

  const handleSave = async () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const taskWithStartDate = { ...currentTodo, startDate: today };

    if (currentTodo._id) {
      const response= await fetch('http://localhost:5000/api/todo/editTodo',
        {
          method: 'PUT',
          body: JSON.stringify({ ...taskWithStartDate, endDate: currentTodo.endDate }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
        if(response.ok)
        {
          response.json().then(todos=> {
            setTodos(todos)
          })
          toast.success("task updated");
        }
        else{
          toast.error("internal server error")
        }
    } else {
      const response= await fetch('http://localhost:5000/api/todo/addTodo',
        {
          method: 'POST',
          body: JSON.stringify({ ...taskWithStartDate, endDate: currentTodo.endDate }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
        if(response.ok)
        {
          response.json().then(todos=> {
            setTodos(todos)
          })
          toast.success("task added");
        }
        else{
          toast.error("internal server error")
        }
    }
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTodo(prev => ({ ...prev, [name]: value }));
  };

  const handleView = (todo) => {
    setViewTodo(todo);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
    setViewTodo({ title: '', description: '', startDate: '', endDate: '' });
  };

  function logout(ev){
    ev.preventDefault();
    fetch('http://localhost:5000/api/user/logout',{
      credentials: 'include',
      method: 'POST',
    }).catch((err)=>{
      toast.error("internal server error")
    });
    setUserInfo(null);
    setTodos([]);
  }

  function formatDateString(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return 'Invalid Date';
    }
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  useEffect(()=>{
    fetch(`http://localhost:5000/api/todo/getTodo/${userInfo?._id}`).then(response=>{
      response.json().then(todos=>{
         setTodos(todos);
      });
  });
  },[])

  if(userInfo===null)
    {
       return <Navigate to="/login"/>
    }

  return (
    <div className="min-h-screen text-black mt-8">
      <Toaster/>
      <CssBaseline />
      <Container maxWidth="md">
        <AppBar position="static" className="bg-gray-800 mb-4 rounded">
          <Toolbar>
            <Typography variant="h6" component="div" className="flex-grow">
              <span className="text-xl">Task Manager</span> <br />
              <span className="text-sm">Welcome, {userInfo.username}</span>
            </Typography>
            <Button color="inherit" className="cursor-pointer" onClick={logout}>Log Out</Button>
          </Toolbar>
        </AppBar>
        <div className="p-4 mb-4 bg-white rounded shadow-md">
          <Typography variant="h5" component="h2" gutterBottom>
            Create Task
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Title"
              margin="dense"
              name="title"
              value={currentTodo.title}
              onChange={handleChange}
              className="rounded"
              InputLabelProps={{}}
              InputProps={{}}
            />
            <TextField
              fullWidth
              label="Description"
              margin="dense"
              name="description"
              multiline
              rows={3}
              value={currentTodo.description}
              onChange={handleChange}
              className="rounded"
              InputLabelProps={{}}
              InputProps={{}}
            />
            <TextField
              fullWidth
              label="End Date"
              margin="dense"
              type="date"
              name="endDate"
              value={currentTodo.endDate}
              onChange={handleChange}
              className="rounded"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: new Date().toISOString().split('T')[0] } }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-2 bg-blue-500 hover:bg-blue-600 cursor-pointer"
              startIcon={<AddCircleOutline />}
              onClick={handleSave}
            >
              {currentTodo._id ? 'Update Task' : 'Create Task'}
            </Button>
          </Box>
        </div>
        <div className="p-4 bg-white rounded shadow-md">
          <Typography variant="h5" component="h2" gutterBottom>
            Tasks
          </Typography>
          <Grid container spacing={2}>
            {todos.length>0&& todos?.map(todo => (
              <Grid item xs={12} sm={6} md={4} key={todo._id}>
                <Card variant="outlined" className="bg-white">
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {todo.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {todo.description.length > 25 ? `${todo.description.slice(0, 25)}...` : todo.description}
                    </Typography>
                    {viewTodo.id === todo.id && (
                      <Typography variant="body2" color="textSecondary">
                        Start Date: {formatDateString(todo.start)}
                      </Typography>
                    )}
                    <Box mt={2} display="flex" justifyContent="space-between">
                      <IconButton color="primary" onClick={() => handleEdit(todo)} className="cursor-pointer">
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(todo._id)} className="cursor-pointer">
                        <Delete />
                      </IconButton>
                      <IconButton color="default" onClick={() => handleView(todo)} className="cursor-pointer">
                        <Info />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{currentTodo?._id ? 'Edit Task' : 'Create Task'}</DialogTitle>
          <DialogContent className="bg-white text-black">
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              name="title"
              value={currentTodo.title}
              onChange={handleChange}
              className="rounded"
              InputLabelProps={{}}
              InputProps={{}}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={3}
              name="description"
              value={currentTodo?.description}
              onChange={handleChange}
              className="rounded"
              InputLabelProps={{}}
              InputProps={{}}
            />
            <TextField
              margin="dense"
              label="End Date"
              type="date"
              fullWidth
              name="endDate"
              value={currentTodo?.endDate}
              onChange={handleChange}
              className="rounded"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: new Date().toISOString().split('T')[0] } }}
            />
          </DialogContent>
          <DialogActions className="bg-white">
            <Button onClick={handleClose} className="text-gray-600">Cancel</Button>
            <Button onClick={handleSave} className="text-blue-500">
              {currentTodo?._id ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={viewOpen} onClose={handleViewClose}>
          <DialogTitle>Task Details</DialogTitle>
          <DialogContent className="bg-white text-black">
            <Typography variant="h6" gutterBottom>
              Title: {viewTodo.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Description: {viewTodo.description}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Start Date: {formatDateString(viewTodo.start)}
            </Typography>
            <Typography variant="body2" gutterBottom>
              End Date: {formatDateString(viewTodo.end)}
            </Typography>
          </DialogContent>
          <DialogActions className="bg-white">
            <Button onClick={handleViewClose} className="text-blue-500">Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}
