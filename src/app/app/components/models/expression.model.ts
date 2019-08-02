/**
 * Created by dattaram on 1/8/19.
 */

export class NodeSelectEventModel {
  event: any;
  parentRef: any;
  node: any;
  constructor(_e: any, _p: any, _n: any) {
    this.event = _e;
    this.parentRef = _p;
    this.node = _n;
  }
}


export class ExpressionModel {
  dataLevel: string;
  type: number;
  constructor(_n: string, _t: number) {
    this.dataLevel = _n;
    this.type = _t;
  }
}
