import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAssemblyLineComponent } from './register-assembly-line.component';

describe('RegisterAssemblyLineComponent', () => {
  let component: RegisterAssemblyLineComponent;
  let fixture: ComponentFixture<RegisterAssemblyLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAssemblyLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAssemblyLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
