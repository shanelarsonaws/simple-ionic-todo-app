import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

import {TodosService} from '../todos.service';
import {Todo} from '../todo/todo';

import * as moment from 'moment';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
    public title: string;
    public note: string;

    public minTodaysDate: string;
    public todaysDate: string;
    public selectedDate: string;

    public error: boolean;

    constructor(private modalCtrl: ModalController, private todosService: TodosService) {
        this.minTodaysDate = moment().format('YYYY-MM-DD');
        this.todaysDate = moment().format('MM/DD/YYYY');
        this.selectedDate = this.todaysDate;
    }

    public clearError() {
        this.error = false;
    }

    public async addTodo() {
        this.error = false;
        const title = this.title;
        const note = this.note;
        if (typeof(title) === 'string' && typeof(note) === 'string' && title.length !== 0 && note.length !== 0) {
            const sub = this.todosService.getTodos().subscribe(todoList => {
                const newId = (todoList.length - 1) + 1;
                const timestamp = new Date(this.selectedDate).getTime();
                const newTodo = new Todo(newId, this.title, this.note, timestamp);
                this.modalCtrl.dismiss(newTodo);
            });
            sub.unsubscribe();
        } else {
            this.error = true;
        }
    }

    async closeModal() {
        this.modalCtrl.dismiss();
    }

    ngOnInit() {
    }

}
