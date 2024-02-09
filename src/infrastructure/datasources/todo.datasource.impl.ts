import { prisma } from "../../data/postgres";
import { CreateTodoDto, CustomError, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {

    async getTodos(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromObject(todo));
    }
    
    async getTodoById(idTodo: number): Promise<TodoEntity> {

        if (isNaN(idTodo)) throw `Invalid id`;

        const todo = await prisma.todo.findUnique({
            where: { id: idTodo }
        });

        if ( !todo ) throw new CustomError(`Todo with id ${idTodo} not found`, 404);

        return TodoEntity.fromObject(todo);
    }

    async addTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {

        const newTodo = await prisma.todo.create({
            data: createTodoDto!,
        });

        return TodoEntity.fromObject(newTodo);
    }


    async removeTodo(idTodo: number): Promise<boolean> {
        await this.getTodoById(idTodo);
        return !!(await prisma.todo.delete({ where: { id: idTodo } }));
    }

    async updateTodo( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity> {

        await this.getTodoById(updateTodoDto.id);

        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values,
        });

        return TodoEntity.fromObject(updatedTodo);
    }
     
}