import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodoController {

    constructor() {
    }


    public getAllTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {

        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ msg: 'Invalid id' });

        const todo = await prisma.todo.findUnique({
            where: { id: id }
        });

        return (todo)
            ? res.json(todo)
            : res.status(404).json({ msg: 'Todo not found' });
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);


        if (error) return res.status(400).json({ msg: error });

        const newTodo = await prisma.todo.create({
            data: createTodoDto!,
        });

        return res.json( newTodo );
    }

    public updateTodo =  async (req: Request, res: Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

        if (error) return res.status(400).json({ msg: error });

        const todo = await prisma.todo.findUnique({
            where: { id: id }
        });

        if (!todo) return res.status(404).json({ msg: 'Todo not found' });

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values,
        });

        return res.json(updatedTodo);
    }

    public deleteTodo = async(req: Request, res: Response) => {

        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ msg: 'Invalid id' });


        const deletedTodo = await prisma.todo.delete({
            where: { id: id }
        });

        return (deletedTodo)
        ? res.json({deletedTodo})
        : res.status(404).json({ msg: 'Todo not found' });
    }



}