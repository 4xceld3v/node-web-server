import { Router } from "express";
import { TodoController } from "../controllers/todo-controller";


export class TodoRoutes {

    static get routes(): Router {
        const router = Router();
        const todoController = new TodoController();

        router.get('/', todoController.getAllTodos );
        router.get('/:id', todoController.getTodoById );
        
        router.post('/create', todoController.createTodo );
        router.put('/:id', todoController.updateTodo );
        router.delete('/:id', todoController.deleteTodo );

        return router;
    }
}