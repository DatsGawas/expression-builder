import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionDataComponent } from './expression-data.component';

describe('ExpressionDataComponent', () => {
  let component: ExpressionDataComponent;
  let fixture: ComponentFixture<ExpressionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
