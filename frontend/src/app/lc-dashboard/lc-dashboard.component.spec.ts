import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcDashboardComponent } from './lc-dashboard.component';

describe('LcDashboardComponent', () => {
  let component: LcDashboardComponent;
  let fixture: ComponentFixture<LcDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LcDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
