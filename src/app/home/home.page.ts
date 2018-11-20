import { Component } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  newfruit:string;
  title:string = 'App Home Page';
  fruits:Array<string> = ['mango','papayas','bananas'];
  constructor(public dataService:DataService){
    this.readTask();//when hompage load its run this function
  }

  addFruit(){
    if(this.newfruit.length>0){
      this.fruits.push(this.newfruit);
      this.newfruit="";
      this.dataService.storeList(this.fruits)
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
        this.fruits=<Array<string>>response;
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }
}
