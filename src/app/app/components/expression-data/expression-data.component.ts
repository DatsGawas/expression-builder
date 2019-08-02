import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ExpressionModel, NodeSelectEventModel} from "../models/expression.model";

@Component({
  selector: 'app-expression-data',
  templateUrl: './expression-data.component.html',
  styleUrls: ['./expression-data.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class ExpressionDataComponent implements OnInit {

  @Input() data: any[] = [];


  @Input('display-key') displayKey = 'name';

  @Input('child-array-key') childArrayKey = 'fields';

  @Output() nodeSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  innerItemSelect(event: any, parent: any, recentParent: any, node: any) {
    event.stopPropagation();
    parent = this.cloneData(parent);
    recentParent[this.childArrayKey] = [];
    recentParent[this.childArrayKey].push(node);
    parent[this.childArrayKey] = [];
    parent[this.childArrayKey].push(recentParent);
    this.nodeSelect.emit(new NodeSelectEventModel(event, parent, node));
  }

  itemSelect(event: any, parent: any, node: any) {
    event.stopPropagation();
    parent = this.cloneData(parent);
    parent[this.childArrayKey] = [];
    parent[this.childArrayKey].push(node);
    node = this.cloneData(node);
    debugger;
    node = new ExpressionModel(node.dataLevel, node.type);
    this.nodeSelect.emit(new NodeSelectEventModel(event, parent, node));
  }

  cloneData(data: any): any {
    return JSON.parse(JSON.stringify(data));
  }
}



