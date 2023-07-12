import { Component } from '@angular/core';
import { TableServiceService } from '../table-service.service';

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.scss']
})
export class TableDialogComponent {
  dataTypeOptions=['select any option','string','number','array','object','boolean'];
  typeOptions=['select any option','textField','selectField','normal'];
  selectedColumnName:any;
  selectedDataType:any;
  selectedType:any;
  obj={
    colName:'',
    dataType:'',
    type:''
  }
  constructor(public service:TableServiceService){

  }
  ngOnInit(){

  }
  changeColumnName(event:any){
    this.selectedColumnName=event.target.value;
  }
  onChangeDataType(event:any){
    console.log("dataType:",event,event.target.value);
    this.selectedDataType=event.target.value;
  }
  onChangeType(event:any){
    console.log("Type:",event,event.target.value);
    this.selectedType=event.target.value;
  }
  Submit(){
    this.obj.colName=this.selectedColumnName;
    this.obj.dataType=this.selectedDataType;
    this.obj.type=this.selectedType
    console.log("obj:",this.obj);
    this.service.sendDataToTable(this.obj);
  }
}
