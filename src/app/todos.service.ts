import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

import {Todo} from './todo/todo';

@Injectable({
    providedIn: 'root'
})
export class TodosService {
    private todoList = new BehaviorSubject<Array<Todo>>([
        {
            id: 0,
            title: 'Starbucks',
            note: 'Large mocha frappe! mmm!!',
            timestamp: 1556016114496
        },
        {
            id: 1,
            title: 'Pay US Cellular bill',
            note: 'Online and bill is $120..',
            timestamp: 1556016146345
        },
        {
            id: 2,
            title: 'Finish demo project tasks',
            note: 'The Todo demo app needs to be done today!',
            timestamp: 1556016162958
        },
        {
            id: 3,
            title: 'Read Medium tutorials',
            note: 'Read some random interesting node.js articles.',
            timestamp: 1556016175653
        },
        {
            id: 4,
            title: 'Eat',
            note: 'Something I need to remember to do more!! lol...',
            timestamp: 1556016187803
        }
    ]);

    constructor() {
    }

    public getTodos(): Observable<Array<Todo>> {
        return this.todoList.asObservable();
    }

    public addTodo(todo): void {
        const newTodoList = [...this.todoList.getValue(), todo];
        this.todoList.next(newTodoList);
    }

    public removeTodo(todoId): void {
        this.todoList.next(this.todoList.getValue().filter(todo => {
            return todo.id !== todoId;
        }));
    }
}
