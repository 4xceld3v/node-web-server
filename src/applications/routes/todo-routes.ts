import { Router } from "express";
import { TodoController } from "../controllers/todo-controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasources/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";


export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const datasource = new TodoDatasourceImpl();
        const repository = new TodoRepositoryImpl(datasource);
        const todoController = new TodoController(repository);

        router.get('/', todoController.getAllTodos);
        router.get('/:id', todoController.getTodoById);

        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}