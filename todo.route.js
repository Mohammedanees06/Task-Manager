import express from "express";
import  Todo from '../models/todo.model.js';

const router=express.Router();

router.get('/', async (req, res) => {

    try {
        const todos = await Todo.find();
        res.json(todos);

    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

//add a new todo

router.post("/", async(req, res) => {
    const todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    }
    catch(error) {
        res.status(400).json({ message: error.message });
    }
})

//update a todo
router.patch("/:id",async(req, res)=> {
    try {
        const todo= await Todo.findById(req.params.id);
        if(!todo) return res.status(404).json({message:"todo not found"});

        if(req.body.text!== undefined) {
            todo.text = req.body.text;
        }
        if(req.body.completed!== undefined) {
            todo.completed = req.body.completed;
        }

        const updateTodo = await todo.save();
        res.json(updateTodo)
    }
    catch(error) {
        res.status(404).json({message: error.message})
    }
});

// delete

router.delete("/:id", async(req, res) => {
    try {
    await Todo.findByIdAndDelete(req.params.id)
    res.json({message:"todo delted"})
    }
    catch(error) {
        res.status(500).json({message: error.message})
    
    }
});

export default router;