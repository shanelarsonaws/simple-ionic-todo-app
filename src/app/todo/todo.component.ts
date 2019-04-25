import {Component, Input, OnInit} from '@angular/core';

import {TodosService} from '../todos.service';

import * as moment from 'moment';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
    @Input() id: string;
    @Input() title: number;
    @Input() note: string;
    @Input() timestamp: number;

    public dueMessage: string;

    constructor(private todosService: TodosService) {

    }

    ngOnInit() {
        if (moment().isSame(this.timestamp, 'day')) {
            this.dueMessage = 'today';
        } else {
            this.dueMessage = moment(moment().format('YYYY-MM-DD')).to(moment(moment(this.timestamp).format('YYYY-MM-DD')));
        }
    }

    removeTodo() {
        this.todosService.removeTodo(this.id);
    }

}
