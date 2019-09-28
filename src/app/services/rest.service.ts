import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {


  apiUrl = 'http://192.168.43.29:45457/api/';

  constructor(private api: HttpClient) { }

  get(url: string) {
    return new Promise((resolve, reject) => {
      this.api.get(`${this.apiUrl}${url}`).subscribe(s => resolve(s), e => reject(e));
    });
  }

  post(url: string, obj: any) {
    return new Promise((resolve, reject) => {
      this.api.post(`${this.apiUrl}${url}`, obj).subscribe(s => resolve(s), e => reject(e));
    });
  }

  put(url: string, obj: any, id: string) {
    return new Promise((resolve, reject) => {
      this.api.put(`${this.apiUrl}${url}/` + id, obj).subscribe(s => resolve(s), e => reject(e));
    });
  }

  delete(url: string, id: string) {
    return new Promise((resolve, reject) => {
      this.api.get(`${this.apiUrl}${url}/` + id).subscribe(s => resolve(s), e => reject(e));
    });
  }


}
