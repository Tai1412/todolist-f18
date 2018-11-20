import { Component } from '@angular/core';
import {DataService} from '../data.service';
import {Task} from '../../models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  taskInput:string;
  title:string = 'App Home Page';
  tasks:Array<Task> = [];
  constructor(public dataService:DataService){
    this.readTask();//when hompage load its run this function
  }
  createTask(taskName:string){
    let taskDate:number=new Date().getTime();
    let task={name: taskName, date:taskDate, status:false};
    return task;
  }

  addTask(){
    if(this.taskInput.length>0){
      this.tasks.push(this.createTask(this.taskInput));
      this.taskInput="";
      this.dataService.storeList(this.tasks)
      .then((response)=>{
        //successs
      })
      .catch((error)=>{
        console.log(error);//javascript here
      });
    }

  }
  readTask(){//when refresh page read the task
    this.dataService.loadList()
    .then((response)=>{
      if(response!==null){
        this.tasks=<Array<Task>>response;
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }
}
