import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsMemosComponent } from './reports-memos.component';

describe('ReportsComponent', () => {
  let component: ReportsMemosComponent;
  let fixture: ComponentFixture<ReportsMemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsMemosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsMemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
