import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityReportComponent } from './quality-report.component';

describe('QualityReportComponent', () => {
  let component: QualityReportComponent;
  let fixture: ComponentFixture<QualityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
