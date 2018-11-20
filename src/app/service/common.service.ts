import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  private sharedDataSource = new Subject<string>();
  public sharedDataSource$ = this.sharedDataSource.asObservable();
  constructor() {}
  public onNotifySharedDataChanged(updated: string) {
    console.log("[CommonService] onNotifySharedDataChanged fired.");
    this.sharedDataSource.next(updated);
  }
}
