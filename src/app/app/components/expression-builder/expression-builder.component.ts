import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExpressionModel, NodeSelectEventModel} from '../models/expression.model';

@Component({
  selector: 'app-expression-builder',
  templateUrl: './expression-builder.component.html',
  styleUrls: ['./expression-builder.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ExpressionBuilderComponent implements OnInit {

  @ViewChild('treeRef') treeRef: any;

  expressionData: any[] = [];

  cloneExpressionData: any[] = [];

  filterValue = '';

  expressionCollection: any[] = [];

  showExpressionData = false;

  @Input('display-key') displayKey = 'name';

  @Input('child-array-key') childArrayKey = 'fields';

  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {
    this._httpClient.get('assets/data/dummyData.json').toPromise().then((res: any) => {
     this.cloneExpressionData = res;
      this.iterateExpressionData();
      this.expressionData = this.cloneData(this.cloneExpressionData);
      this.expandTree();
    });

    this._httpClient.get('assets/data/operatorData.json').toPromise().then((res: any) => {
      this.cloneExpressionData = this.cloneExpressionData.concat(res);
      this.expressionData = this.cloneData(this.cloneExpressionData);
    });
  }

  iterateExpressionData() {
    this.cloneExpressionData.forEach((model: any) => {
      if (model[this.childArrayKey] && model[this.childArrayKey].length > 0) {
        model[this.childArrayKey].forEach((field: any) => {
          field['dataLevel'] =  this.findDataReader(model, field);
          field['type'] = 1;

          if (field[this.childArrayKey] && field[this.childArrayKey].length > 0) {
           this.iterateExpressionDataInChild(model, field);
          }
        });
      }

    });
    debugger;
  }

  iterateExpressionDataInChild(model: any, parent: any) {
    parent[this.childArrayKey].forEach((field: any) => {
      field['dataLevel'] =  this.findDataReader(model, field);
      field['type'] = 1;

      if (field[this.childArrayKey] && field[this.childArrayKey].length > 0) {
        this.iterateExpressionDataInChild(model, field);
      }
    });
  }


  findDataReader(model: any, selectedField: any): string {
    debugger;
    let fieldLocation = model.hiddenName;
    for (let i = 0; i < model.fields.length ; i++) {
      if (model.fields[i].hiddenName === selectedField.hiddenName) {
        fieldLocation = model.hiddenName + '.' + model.fields[i].hiddenName;
        return fieldLocation;
      } else if (model.fields[i].hasOwnProperty('fields') && model.fields[i].fields.length > 0 ) {
        fieldLocation =  this.findDataReaderInChild(model.fields[i], selectedField, fieldLocation);
      }
    }
    return fieldLocation ;
  }

  findDataReaderInChild(child: any, selectedField: any, fieldLocation: string): string {
    for (let i = 0; i < child.fields.length; i++) {
      if (child.fields[i].hiddenName === selectedField.hiddenName) {
        fieldLocation = fieldLocation + '.' + child.hiddenName + '.' + child.fields[i].hiddenName ;
        return fieldLocation;
      } else if (child.fields[i].hasOwnProperty('fields') && child.fields[i].fields.length > 0) {
        fieldLocation = this.findDataReaderInChild(child.fields[i], selectedField, fieldLocation);
      }
    }
    return fieldLocation;
  }



  inputEventHandle(value: any) {
    this.filterValue = value;
    if (this.filterValue !== '') {
      this.showExpressionData = true;
      this.expressionData = this.filterData(this.cloneData(this.cloneExpressionData), this.filterValue);
    } else {
      this.expressionData = this.cloneData(this.cloneExpressionData);
    }
    this.expandTree();
  }


  filterData(data: any[], matchingTitle: any): any {
    const tempDisplay = this.displayKey;
    const tempcChildArrayKey = this.childArrayKey;
    return data.filter(function f(node: any) {
      if ( node[tempDisplay].toLowerCase().startsWith(matchingTitle.toLowerCase())) {
        return true;
      }
      if (node[tempcChildArrayKey]) {
        return (node[tempcChildArrayKey] = node[tempcChildArrayKey].filter(f)).length;
      }

    });
  }

  addHardcodeValueHandle(event: any) {
    if (event.keyCode === 13 && this.filterValue !== '') {
      this.expressionCollection.push(new ExpressionModel(this.filterValue, 3));
      this.filterValue = '';
      this.expressionData = this.cloneData(this.cloneExpressionData);
    }
  }

  nodeClickHandle(data: NodeSelectEventModel) {
    debugger;
    this.expressionCollection.push(data.node);
  }

  removeItemHandle(item: any, i: any) {
    this.expressionCollection.splice(i, 1);

  }

  cloneData(data: any): any {
    return JSON.parse(JSON.stringify(data));
  }
  expandTree() {
    if (this.treeRef) {
      this.treeRef.expandAll();
    }
  }

}
