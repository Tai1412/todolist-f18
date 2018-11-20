import { Injectable } from '@angular/core';
import {Task} from '../models/task';
@Injectable({
  providedIn: 'root'
})
export class DataService {//share dta to other page

  constructor() { }
  //method to store data
  storeList(list:Array<Task>){//list:array<string> is argument
    return new Promise((resolve,reject)=>{
      let data =JSON.stringify( list );//local storage only accept stringify
      try{
        window.localStorage.setItem('list',data);//key and data in setItem, data gonna be list in storeList
        if(window.localStorage.getItem('list')){
            resolve(true);
        }
        else{
          throw('save failed');
        }
      }
      catch( error ){
        reject( error );
      }
  });//restore when something done

  }

  //method to read data
  loadList(){
    return new Promise((resolve,reject)=>{
      let data = window.localStorage.getItem('list');
      if(data){
        resolve(JSON.parse(data));//JSON parse convert string back to array because local storage only accept string
      }
      else{
        reject(null);
      }
    })
  }
}
