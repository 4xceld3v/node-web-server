import { Request, Response } from "express";

const todos = [
    { id: 1, title: 'Todo 1', completed: true, createAt: new Date() },
    { id: 2, title: 'Todo 2', completed: false, createAt: new Date() },
    { id: 3, title: 'Todo 3', completed: true, createAt: null },
    { id: 4, title: 'Todo 4', completed: false, createAt: new Date() },
    { id: 5, title: 'Todo 5', completed: true, createAt: new Date() },
];


export class TodoController {

    constructor() {
    }


    public getAllTodos = (req: Request, res: Response) => {
        return res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {

        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ msg: 'Invalid id' });

        const todo = todos.find(todo => todo.id === id);

        return (todo)
            ? res.json(todo)
            : res.status(404).json({ msg: 'Todo not found' });
    }

    public createTodo = (req: Request, res: Response) => {

        const { title, completed } = req.body;

        if (!title) return res.status(400).json({ msg: 'Title is required' });

        const newTodo = {
            id: todos.length + 1,
            title,
            completed: (completed) ? completed : false,
            createAt: new Date()
        };

        todos.push(newTodo);

        return res.json(newTodo);
    }

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ msg: 'Invalid id' });

        const { title, completed, createAt } = req.body;

        const todo = todos.find(todo => todo.id === id);

        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        //! Ojo pasa por referencia
        todo.title = title;
        todo.completed = completed || todo.completed;
        ( todo.createAt == null )
        ? todo.createAt = null 
        : new Date( createAt || todo.createAt );

        return res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ msg: 'Invalid id' });

        const todo = todos.find(todo => todo.id === id);

        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        const index = todos.indexOf(todo);

        todos.splice(index, 1);

        return res.json(todo);
    }



}