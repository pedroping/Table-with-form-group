import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayColumns = ['id', 'from', 'to'];
  form: FormGroup = new FormGroup({ dates: new FormArray([]) });

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  get dateFormArray(): FormArray {
    return this.form.get('dates') as FormArray;
  }

  addRow() {
    const row = new FormGroup({
      from: new FormControl(null),
      to: new FormControl(null),
    });
    this.dateFormArray.push(row);
    this.dataSource.data = this.dateFormArray.controls;
  }

  getActualIndex(index: number) {
    return index + this.paginator.pageSize * this.paginator.pageIndex;
  }
}
