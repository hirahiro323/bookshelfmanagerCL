import { Component, OnInit } from "@angular/core";
import { ListService } from "../service/list.service";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatTableDataSource } from "@angular/material";

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
export class ListComponent implements OnInit {
  items: any[][];
  dataSource: MatTableDataSource<any>;
  displayedColumns = ["id", "title", "rentalUserId", "startDate", "dueDate"];
  expandedElement: MatTableDataSource<any>;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty("detailRow");

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filterPredicate = (data, filter: string) =>
        data[0].title.indexOf(filter) != -1;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * expand collapse a row
   * @param row
   */
  toggleRow(row) {
    this.expandedElement === row ? null : row;
  }
}
