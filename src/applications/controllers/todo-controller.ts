import e, { Request, Response } from "express";
import { CreateTodo, CreateTodoDto, CustomError, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo, UpdateTodoDto } from "../../domain";
import { get } from "http";

export class TodoController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    private handleError = (error: unknown, res: Response) => {

        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        
        res.status(500).json({ error: 'Internal server error - Please contact support team'});
    }


    public getAllTodos = (_req: Request, res: Response) => {
        
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => this.handleError(error, res));
    }

    public getTodoById = (req: Request, res: Response) => {

        const id = +req.params.id;

        new GetTodo(this.todoRepository)
        .execute(id).then(todo => res.json(todo))
        .catch(error => this.handleError(error, res));

    }

    public createTodo = (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });

        new CreateTodo(this.todoRepository)
        .execute(createTodoDto!)
        .then(todo => res.status(201).json(todo))
        .catch(error => this.handleError(error, res));

    }

    public updateTodo =  (req: Request, res: Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

        if (error) return res.status(400).json({ msg: error });

        new UpdateTodo(this.todoRepository)
        .execute(updateTodoDto!)
        .then(todo => res.json(todo))
        .catch(error => this.handleError(error, res));

    }

    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
 
        new DeleteTodo(this.todoRepository)
        .execute(id)
        .then(() => res.json({ msg: "Todo deleted" }))
        .catch(error => this.handleError(error, res));

    }



}