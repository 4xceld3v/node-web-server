import e, { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) {}


    public getAllTodos = async (_req: Request, res: Response) => {
        const todos = await this.todoRepository.getTodos();
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {

        const id = +req.params.id;

        try{

            const todo = await this.todoRepository.getTodoById(id);

            return res.json(todo);

        }catch(error){

            return res.status(400).json({ error });

        }
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ msg: error });

        const newTodo = await this.todoRepository.addTodo(createTodoDto!);

        return res.json(newTodo);
    }

    public updateTodo =  async (req: Request, res: Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

        if (error) return res.status(400).json({ msg: error });

        const updatedTodo = await this.todoRepository.updateTodo(updateTodoDto!);

        return res.json(updatedTodo);
    }

    public deleteTodo = async(req: Request, res: Response) => {

        const id = +req.params.id;

        try{
            const removed = await this.todoRepository.removeTodo(id);
            return res.json({ removed });

        }catch(error){

            return res.status(400).json({ error });

        }
    }



}