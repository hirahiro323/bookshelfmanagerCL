import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { ListService } from "../service/list.service";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatTableDataSource } from "@angular/material";
import { CommonService } from "../service/common.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0", visibility: "hidden" })),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))
    ])
  ]
})
export class ListComponent implements OnInit, OnDestroy {
  items: any[][];
  @Input() dataSource: MatTableDataSource<any>;
  displayedColumns = ["id", "title", "rentalUserId", "startDate", "dueDate"];
  expandedElement: MatTableDataSource<any>;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty("detailRow");

  /**
   * CommonService の変数の参照を取得するプロパティ
   *
   * @type {String}
   * @memberof Sample1Component
   */
  public serviceProp: String = "Initialized by Sample1Component";

  /**
   * subscribe を保持するための Subscription
   *
   * @private
   * @type {Subscription}
   * @memberof Sample1Component
   */
  private subscription: Subscription;

  constructor(private listService: ListService, private commonService: CommonService) {}

  ngOnInit() {
    this.listService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (data, filter: string) =>
        data[0].title.indexOf(filter) != -1;
    });
    this.subscription = this.commonService.sharedDataSource$.subscribe(msg => {
      console.log("[Sample1Component] shared data updated.");
      this.serviceProp = msg;
    });
  }

  /**
   * コンポーネント終了時の処理
   *
   * @memberof Sample1Component
   */
  ngOnDestroy() {
    //  リソースリーク防止のため CommonService から subcribe したオブジェクトを破棄する
    this.subscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClicSendMessage() {
    // CommonService のデータ更新を行う
    this.commonService.onNotifySharedDataChanged("Updated by Sample1Component.");
  }
}
