import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMachineComponent } from './register-machine.component';

describe('RegisterMachineComponent', () => {
  let component: RegisterMachineComponent;
  let fixture: ComponentFixture<RegisterMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterMachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
