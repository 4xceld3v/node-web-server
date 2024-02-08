import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";


export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDatasource
    ) {}

    async getTodos(): Promise<TodoEntity[]> {
        return this.datasource.getTodos();
    }

    async getTodoById(idTodo: number): Promise<TodoEntity> {
        return this.datasource.getTodoById(idTodo);
    }

    async addTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.addTodo(createTodoDto);
    } 

    async removeTodo(idTodo: number): Promise<boolean> {
        return this.datasource.removeTodo(idTodo);
    }
    
    async updateTodo(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateTodo(updateTodoDto);
    }

}