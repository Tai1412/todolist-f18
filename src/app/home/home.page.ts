import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  newfruit:string;
  title:string = 'App Home Page';
  fruits:Array<string> = ['mango','papayas','bananas'];

  addFruit(){
    if(this.newfruit.length>0){
      this.fruits.push(this.newfruit);
      this.newfruit="";
    }

  }
}
