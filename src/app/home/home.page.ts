import {Component} from '@angular/core';

import {TodoListComponent} from '../todo-list/todo-list.component';

import {AddTodoComponent} from '../add-todo/add-todo.component';

import {TodosService} from '../todos.service';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    private modal: HTMLIonModalElement;

    constructor(private todosService: TodosService, private modalController: ModalController) {}

    public async addTodo() {
        this.modal = await this.modalController.create({
            component: AddTodoComponent
        });
        this.modal.present();
        const modalData = await this.modal.onDidDismiss();
        const newTodo = modalData.data;
        if (newTodo !== undefined) {
            this.todosService.addTodo(newTodo);
        }
    }
}
