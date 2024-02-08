import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoDatasource {

    abstract getTodos(): Promise<TodoEntity[]>;
    abstract getTodoById( idTodo: number ): Promise<TodoEntity>;
    abstract addTodo( createTodoDto: CreateTodoDto ): Promise<TodoEntity>;
    abstract removeTodo( idTodo: number ): Promise<boolean>;
    abstract updateTodo( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>;
    
}