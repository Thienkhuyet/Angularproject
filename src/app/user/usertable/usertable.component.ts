import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss']
})
export class UsertableComponent implements OnInit {
  @Input() displayedColumns: any[];
 // @Input() dataTable: any[];
  @Input() actions: any[];
  // @Input() filter: string | Observable<string>;
  @Input() dataSource: any;
 // @Input() views: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // dataSource = new MatTableDataSource<CarrierUserRequirements>();
  constructor() { }

  ngOnInit() {
  }
  runAction(row, action): void {
    // row = _.omit(row, this._nestedColumns);
    action(row);

  }
  checkIcon(icon: boolean): string {
    if (icon) { return 'done'; } else {
      return 'clear';
    }

  }
}
