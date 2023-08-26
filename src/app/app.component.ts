import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import tableData from '../assets/json/table.json';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import { TableServiceService } from './table-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  data:any;
  selectedSheet:any;
  sheetTableData:any;
  sortDirection='asc';
  temp:any;
  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public service:TableServiceService){

  }
  ngOnInit(): void {
    this.data=tableData;
    console.log(tableData);
    // this.data.sheets.forEach((each:any)=>{
    //   if(each.sheetName=='sample1')
    //   this.sheetTableData=each;
    // });
    this.sheetTableData=this.data.sheets[0];
    console.log("sheetTableData:",this.sheetTableData)
  }
  title = 'table-task';
  selectSheet(sheet:any){
    this.selectedSheet=sheet.sheetName;
    this.sheetTableData=sheet;
    console.log("selectedSheet:",this.selectedSheet,this.sheetTableData);
  }
  onChangeFunction(event:any,id:any,colName:any){
    console.log("onChangeFunction:",event.target.value,id)
    this.sheetTableData.data.map((item:any)=>{
      if(item.id==id){
        item[colName]=event.target.value;
      }
    })
  }
  submit(){
    console.log("submit:",this.sheetTableData);
  }
  sortTable(column:any){
    this.sheetTableData.data.sort((a:any, b:any) => {
      console.log(a,b);
      if(this.sortDirection=='desc'){
        if (a[column] < b[column]) return 1;
        if (a[column] > b[column]) return -1;
      }
      else{
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
      }
      return 0;
    });
    this.sortDirection=='desc'
    ?this.sortDirection='asc':
    this.sortDirection='desc';
  }
  addRow(){
    let temp:any={id:this.sheetTableData.data.length+1};
    this.sheetTableData.data.push(temp);

  }
  addColumn(){
    const dialogRef = this.dialog.open(TableDialogComponent, {
      height:'350px',
      width:'500px',
      data: {},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.sheetTableData.columns.push(result);
      // this.service.selectedData().subscribe((data:any)=>{
      //   this.sheetTableData.columns.push(data);
      // })
    });
  }
  deleteRow(id:number){
    let result=this.sheetTableData.data.filter((item:any)=>item.id!==id);
    result.map((item:any,index:number)=>{
      item.id=++index;
    })
    this.sheetTableData.data=result;
    console.log("result:",result);
  }
}
