import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { Task } from '../task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  taskObj:Task = new Task();
  task:any
  tasks:any
  userData:any
  mobile:any
  editTaskvalue:any
  constructor(private _service:CommonService,private _router:Router) { }

  ngOnInit(): void {
    this.taskObj = new Task();
    this.editTaskvalue = "";
    this.getAllTasks()
    this.userData=JSON.parse(localStorage.getItem('userData')!)
  }
  getAllTasks()
  {
    this._service.getAllRemote().subscribe(
      data =>{
        this.tasks=data;
        console.log(this.tasks)
      }
    )
  }
  delete(taskid:any){
    this._service.deleteById(taskid).subscribe(
      data =>{
      console.log("Task id"+taskid)
      this.refreshPage();
      }
      )
  }
  reloadCurrentRoute() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this._router.navigate([currentUrl]);
    });
}
refreshPage() {
  window.location.reload();
 }
  addTask(data:any){
    console.log(data)
    console.log("In add task")
    console.log(this.userData)
    console.log(data.value)
    data.task=data.value
    if(data.task != ""){
    this._service.addtoTask(data).subscribe(
      data=>{
        console.log("Adding"+data);
       this.refreshPage();
      }
    )
    }
    else{
      alert("Task should not be empty");
    }
  }
  editTask(){
    this.taskObj.task = this.editTaskvalue
    this._service.addtoTask(this.taskObj).subscribe(
      data=>{
        console.log(this.taskObj);
      }
    )
  }
  call(etask:Task)
  {
    this.taskObj = etask
    this.editTaskvalue = etask.task
    console.log(this.editTaskvalue);
    console.log(this.taskObj);
    
  }
}
