const TodoModel = require("../models/todo");
const { mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');

exports.addTodo = async (req, res) => {
    try {
        const { token } = req.cookies;
        jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const { title, description, startDate, endDate } = req.body;


            await mongoose.connect(process.env.DATABASE_URL);
            await TodoModel.create({ title, description, start:startDate, end:endDate, author: info.id });

            const todos = await TodoModel.find({ author: info.id }).sort({ start: -1 });
            return res.json(todos);
        })
    } catch (err) {
        console.error('An error occurred while creating a post:', err);
        return res.status(500).json({ error: 'An error occurred, please try again later' });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const { token } = req.cookies;
        const { id } = req.body;
        jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.status(401).json({ error: 'Unauthorized' });
            }

            await mongoose.connect(process.env.DATABASE_URL);

            const todo = await TodoModel.findById(id);
            if (!todo) {
                return res.status(404).json({ error: 'todo not found' });
            }

            await TodoModel.deleteOne({ _id: id });
            const todos = await TodoModel.find({ author: info.id }).sort({ start: -1 });
            return res.json(todos);

        });
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

exports.editTodo = async (req, res) => {
    try {

        const { token } = req.cookies;
        const { _id, title, description, endDate, startDate } = req.body;

        jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.status(401).json({ error: 'Unauthorized' });
            }

            await mongoose.connect(process.env.DATABASE_URL);

            await TodoModel.updateOne({ _id: _id }, { $set: { title, description, start:startDate, end:endDate } });
            var todos = await TodoModel.find({ author: info.id }).sort({ start: -1 });
            return res.json(todos);

        });
    } catch (error) {
        console.error('Error editing post:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getTodo = async (req, res) => {
    try {
            const {id} = req.params;
            await mongoose.connect(process.env.DATABASE_URL);
            const todos = await TodoModel.find({ author: id }).sort({ start: -1 });
            return res.json(todos);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return res.status(500).json({ error: 'Failed to fetch posts' });
    }
}