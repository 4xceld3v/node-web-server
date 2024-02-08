import { TodoRepository } from "../../repositories/todo.repository";


export interface DeleteTodoUseCase {

    execute( id: number ): Promise<boolean>;

}

export class DeleteTodo implements DeleteTodoUseCase {

    constructor(
        private readonly repository: TodoRepository
    ) {}

    execute( id: number ): Promise<boolean> {
        return this.repository.removeTodo( id );
    }

}