import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(public httpClient: HttpClient) { }

  create(data) {
    let url = "https://hotel-application-backend.herokuapp.com/profile/create";
    return this.httpClient.post(url, data);
  }

  readAll() {
    let url = "https://hotel-application-backend.herokuapp.com/profile/read";
    return this.httpClient.get(url);
  }

  read(data) {
    let url = "https://hotel-application-backend.herokuapp.com/profile/read";
    return this.httpClient.post(url, data);
  }

  update(data) {
    let url = "https://hotel-application-backend.herokuapp.com/profile/update";
    return this.httpClient.post(url, data);
  }

  delete(data) {
    let url = "https://hotel-application-backend.herokuapp.com/profile/delete";
    return this.httpClient.post(url, data);
  }

  sendMail(data) {
    let url = "https://ajithkumar728.educationhost.cloud/covid/sendMail.php";
    const formdata=new FormData();
    Object.keys(data).forEach(element => {
      formdata.append(element, data[element]);
    });
    return this.httpClient.post(url, formdata);
  }

}
