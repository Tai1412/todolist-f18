import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Task } from '../../models/task';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  tasks:Array<Task> = [];
  taskInput:string = '';
  title:string = 'Add new task';

  constructor(
    public dataService:DataService,
    private toaster:ToastController,
  ) {
    this.readTasks();
   }

  ngOnInit() {
  }
  //create a new task object
  createTask(taskName:string){
    let taskDate:number = new Date().getTime();
    let task = {name: taskName, date: taskDate, status: false };
    return task;
  }
  //add a new task to list
  addTask(){
    if( this.taskInput.length > 0 ){
      this.tasks.push( this.createTask( this.taskInput ) );
      this.taskInput = '';
      this.sortItems();
      this.dataService.storeList(this.tasks)
      .then( ( response ) => {
        this.showToast('item saved successfully');
      })
      .catch( (error) => {
        console.log( error );
      });
    }
  }

  //load tasks from storage
  readTasks(){
    this.dataService.loadList()
    .then( (response) => {
      if( response !== null ){
        this.tasks = <Array<Task>> response;
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  //sort tasks first by date, then by status
  sortItems(){
    //add delay
    setTimeout( () => {
      //sort by date
      this.tasks.sort( ( task1, task2 ) => {
        if( task1.date < task2.date ){ return 1}
        if( task1.date > task2.date ){ return -1}
        if( task1.date == task2.date ){ return 0}
      });
      //sort by status
      this.tasks.sort( (task1, task2 ) => {
        let status1:number = task1.status ? 1 : 0;
        let status2:number = task2.status ? 1 : 0;
        return status1 - status2;
      });
    }, 1000);

  }

  async showToast(message:string){
    const toast = await this.toaster.create({
      message: message,
      position: 'bottom',
      duration:1000
    });
    toast.present();
  }


}
