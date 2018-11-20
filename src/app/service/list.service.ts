import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};

@Injectable({ providedIn: "root" })
export class ListService {
  //url: string = "https://bookshelfmanager.herokuapp.com/api/";
  url: string = "http://localhost:8080/api/";

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.url);
  }

  // updateBook(): void {
  //   this.http.post<any>(this.url, , httpOptions).pipe();
  // }
}
