import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongestionIssueReportComponent } from './congestion-issue-report.component';

describe('CongestionIssueReportComponent', () => {
  let component: CongestionIssueReportComponent;
  let fixture: ComponentFixture<CongestionIssueReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongestionIssueReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongestionIssueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
