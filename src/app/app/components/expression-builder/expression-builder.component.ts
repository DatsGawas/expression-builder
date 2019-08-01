import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-expression-builder',
  templateUrl: './expression-builder.component.html',
  styleUrls: ['./expression-builder.component.css']
})
export class ExpressionBuilderComponent implements OnInit {
  @ViewChild('treeRef') treeRef: any;
  expressionData: any[] = [];

  cloneExpressionData: any[] = [];

  filterValue = '';

  expressionCollection: any[] = [];

  @Input('display-key') displayKey = 'name';

  @Input('child-array-key') childArrayKey = 'fields';

  constructor(private _httpClient: HttpClient) { }

  ngOnInit() {
    this._httpClient.get('assets/data/dummyData.json').toPromise().then((res: any) => {
     this.cloneExpressionData = res;
     this.expressionData = this.cloneData(this.cloneExpressionData);
      this.expandTree();
    });
  }

  inputEventHandle(value: any) {
    if (value !== '') {
      this.expressionData = this.filterData(this.cloneData(this.cloneExpressionData), value);
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

  nodeClickHandle(data: any) {
  debugger;
  this.expressionCollection.push(data);
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
