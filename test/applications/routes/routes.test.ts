import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';
import e from 'express';


describe('Todo Routes testing',  () => {

    beforeAll(async () => {
        await testServer.start();
    });

    afterAll( async () => {
        testServer.close();
        await prisma.todo.deleteMany();
    });

    beforeEach(async () => {
        await prisma.todo.deleteMany();
    });

    const todo1 = {text: 'test todo1'};
    const todo2 = {text: 'test todo2'};

    test('should return Todos apis', async () => {

        await prisma.todo.createMany({
            data: [todo1, todo2]
        });

        const { body } = await request(testServer.app)
        .get('/api/todos')
        .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(2);
        expect(body[0].text).toBe(todo1.text);
        expect(body[1].text).toBe(todo2.text);
    });

    test('should return Todo by id', async () => {

        const todo = await prisma.todo.create({
            data: todo1
        });

        const { body } = await request(testServer.app)
        .get(`/api/todos/${todo.id}`)
        .expect(200);

        expect(body).toEqual({
            id: todo.id, 
            text: todo.text, 
            completedAt: todo.completedAt
        });
        
    });

    test('should return 404 if Todo not found', async () => {

        const todoId = 100;

        const {body} = await request(testServer.app)
            .get(`/api/todos/${todoId}`)
            .expect(404);
        
        expect(body).toEqual({error: `Todo with id ${todoId} not found`});

    });

    test('should fail to create Todo with invalid data', async () => {

        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({})
            .expect(400);

        expect(body).toEqual({ error: 'text property is required' });
    });

    test('should fail to create Todo with invalid data', async () => {

        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({ text: '' })
            .expect(400);

        expect(body).toEqual({ error: 'text property is required' });
    });

    test('should update Todo', async () => {
            
            const todo = await prisma.todo.create({
                data: todo1
            });
    
            const { body } = await request(testServer.app)
                .put(`/api/todos/${todo.id}`)
                .send({ text: 'updated todo', completedAt: '2021-09-01'})
                .expect(200);

            expect(body).toEqual({ 
                id: expect.any(Number), 
                text: 'updated todo', 
                completedAt: '2021-09-01T00:00:00.000Z' 
            });
    });

    test('should return 404 if Todo not found update', async () => {
            
            const todoId = 100;
    
            const {body} = await request(testServer.app)
                .put(`/api/todos/${todoId}`)
                .send({text: 'updated todo'})
                .expect(404);
            
            expect(body).toEqual({error: `Todo with id ${todoId} not found`});
    });

    test('should update only completedAt', async () => {

        const todo = await prisma.todo.create({
            data: todo1
        });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ completedAt: '2021-09-01' })
            .expect(200);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo.text,
            completedAt: '2021-09-01T00:00:00.000Z'
        });
    });

    test('should delete Todo', async () => {
        
        const todo = await prisma.todo.create({
            data: todo1
        });

        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({ msg: "Todo deleted" });
        const todos = await prisma.todo.findMany();
        expect(todos).toHaveLength(0);
    });

    test('should return 404 if Todo not found delete', async () => {
        
        const todoId = 100;

        const {body} = await request(testServer.app)
            .delete(`/api/todos/${todoId}`)
            .expect(404);
        
        expect(body).toEqual({error: `Todo with id ${todoId} not found`});
    });


});