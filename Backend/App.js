import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
app.use(bodyParser.json());

const username = process.env.USERNAME1; // Ensure the environment variable names are correct
const password = encodeURIComponent(process.env.PASSWORD);

const url = `mongodb+srv://${username}:${password}@mydata.bkwkloc.mongodb.net/?retryWrites=true&w=majority&appName=MyData`;

// Connect to MongoDB Atlas
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
});

// Define To-Do Schema and Model
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    detail_description: String
});

const Todo = mongoose.model('Todo', todoSchema);

// Create a new To-Do
app.post('/', async (req, res) => {
    try {
        const { title, description, date, detail_description } = req.body;
        const newTodo = new Todo({ title, description, date, detail_description });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read all To-Dos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read a single To-Do by ID
app.get('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).send('To-Do not found');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a To-Do by ID
app.put('/todos/:id', async (req, res) => {
    try {
        const { title, description, date, detail_description } = req.body;
        const todo = await Todo.findByIdAndUpdate(req.params.id, { title, description, date, detail_description }, { new: true });
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).send('To-Do not found');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a To-Do by ID
app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).send('To-Do not found');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
