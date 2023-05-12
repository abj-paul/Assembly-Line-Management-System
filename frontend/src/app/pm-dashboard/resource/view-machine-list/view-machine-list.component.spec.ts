import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMachineListComponent } from './view-machine-list.component';

describe('ViewMachineListComponent', () => {
  let component: ViewMachineListComponent;
  let fixture: ComponentFixture<ViewMachineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMachineListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMachineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
