import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http:HttpClient) { }
  getAllRemote():Observable<any>
  {
    return this._http.get<any>("http://localhost:8087/Task/getTasks")
  }
  deleteById(taskid:any)
  {
    return this._http.delete<any>("http://localhost:8087/Task/Delete/"+`${taskid}`)
  }
  addtoTask(task:any)
  {
    return this._http.post<any>("http://localhost:8087/Task/create",task)
  }
}
