import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../todo/todo';
import {TodosService} from '../todos.service';
import * as moment from 'moment';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
    @Input() todayOnly: boolean;

    private todoList: Array<Todo> = [];
    private modal: HTMLIonModalElement;

    public today: number;

    constructor(private todosService: TodosService) {
        this.today = new Date().getTime();
    }

    public getTodos(): void {
        this.todosService.getTodos().subscribe(todoList => {
            if (this.todayOnly) {
                todoList = todoList.filter(todoItem => {
                    return moment(todoItem.timestamp).isSame(this.today, 'day');
                });
            }
            this.todoList = todoList;
        });
    }

    ngOnInit() {
        this.getTodos();
    }
}
