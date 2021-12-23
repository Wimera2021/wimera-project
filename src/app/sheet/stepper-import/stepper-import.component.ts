import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AdminService } from 'src/app/admin/admin.service';
import { Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import * as _ from 'underscore';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stepper-import',
  templateUrl: './stepper-import.component.html',
  styleUrls: ['./stepper-import.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class StepperImportComponent implements OnInit {
  row;
  Bays = [];
  Cells = [];
  Checklists = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  FileName: any;
  header: boolean;
  csvRecords = [];
  cellSub: Subscription;
  public rows: any[] = [
    { id: 1, name: 'Row 1', value: '0' },
    { id: 2, name: 'Row 2', value: '1' },
    { id: 3, name: 'Row 3', value: '2' },
    { id: 4, name: 'Row 4', value: '3' },
    { id: 5, name: 'Row 5', value: '4' },
  ];
  SelectedRadio: string;
  isChecked: boolean;
  columnKey: any = [];
  bays: any;
  cellData: any = [];
  cells: any = [];
  checkLists: any = [];
  currentBay: any = [];
  formvals: any = [];
  opNo;

  constructor(
    private _formBuilder: FormBuilder,
    private ngxCsvParser: NgxCsvParser,
    private adminService: AdminService,
    private _snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<StepperImportComponent>
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      bay: ['', Validators.required],
      cell: ['', Validators.required],
      checklist: ['', Validators.required],
      opNo: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      file: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      row: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      column: ['', Validators.required],
    });

    this.adminService.getCells();
    this.cellSub = this.adminService
      .getCellUpdateListener()
      .subscribe((users) => {
        this.cellData = users;
        console.log('Dashboard ngOnInit: ', this.cellData);

        this.bays = this.cellData.map((cells, index) => {
          return cells.Bay;
        });
        this.bays = [...new Set(this.bays)];
      });
    this.formvals = [];
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.FileName = $event.srcElement.files[0].name;
    this.header =
      (this.header as unknown as string) === 'true' || this.header === false;
    this.readData(files);
  }

  readData(files) {
    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: Array<any>) => {
          this.csvRecords.push(...result);
        },
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
  }

  getSelectedColumn(value, event: MatCheckboxChange, index) {
    if (event.checked) {
      this.isChecked = true;
      this.columnKey.push({ index: index, Column: value });
    } else {
      console.log('Column Key length:', this.columnKey.length);
      if (this.columnKey.length - 1 == 0) {
        this.isChecked = false;
      }
      let index = this.columnKey.indexOf(value);
      this.columnKey.splice(index, 1);
    }
    console.log(this.columnKey);
  }

  onSelectBay(event: MatSelectChange) {
    var bay = event.value;
    this.cells = [];
    this.checkLists = [];
    this.currentBay = bay;
    for (var i = 0; i < this.cellData.length; i++) {
      if (bay == this.cellData[i].Bay) {
        this.cells.push(this.cellData[i].cellName);
      }
    }
    this.cells = [...new Set(this.cells)];
    console.log(this.cells);
  }

  onSelectCell(event: MatSelectChange) {
    var cell = event.value;
    this.checkLists = [];
    for (var i = 0; i < this.cellData.length; i++) {
      if (
        cell == this.cellData[i].cellName &&
        this.currentBay == this.cellData[i].Bay
      ) {
        this.checkLists.push(this.cellData[i].checklistName);
      }
    }
    this.checkLists = [...new Set(this.checkLists)];
  }

  onForm1() {
    this.opNo = this.firstFormGroup.value.opNo;
    //console.log('Form1 Submitted :', this.opNo);
    this.formvals = this.firstFormGroup.value;
    console.log('Form Vals:', this.formvals);
    this.adminService.getParticularCell(this.formvals);
  }

  onForm2() {
    console.log('CSV Records :', this.csvRecords);
  }

  onForm3() {
    this.row = this.SelectedRadio;
    console.log('Selected Radio : ', this.SelectedRadio);
  }

  getColumnValues() {
    var i,
      j = 0,
      arr = [];
    for (i = this.row; i < this.csvRecords.length; i++) {
      arr[i] = [];
      for (j = 0; j < this.columnKey.length; j++) {
        var val = this.columnKey[j].index;
        arr[i][j] = this.csvRecords[i][val];
      }
    }
    return arr;
  }

  convertKeyValue(final) {
    var output: any[] = [];
    let i = parseInt(this.row);
    for (let index = i + 1; index < final.length; index++) {
      output.push(_.object(final[i], final[index]));
    }
    return output;
  }

  onAddFile() {
    if (this.csvRecords.length > 0) {
      var filteredData = [],
        final = [];
      final = this.getColumnValues();

      filteredData = this.convertKeyValue(final);
      //console.log(filteredData);
      console.log('OpNO: ');
      this.adminService.putImportValues(this.opNo, filteredData);
      this._snackbar.open('New file imported!', '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
      });
      this.onClose();
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
