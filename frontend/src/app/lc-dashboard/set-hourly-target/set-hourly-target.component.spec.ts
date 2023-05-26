import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetHourlyTargetComponent } from './set-hourly-target.component';

describe('SetHourlyTargetComponent', () => {
  let component: SetHourlyTargetComponent;
  let fixture: ComponentFixture<SetHourlyTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetHourlyTargetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetHourlyTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
