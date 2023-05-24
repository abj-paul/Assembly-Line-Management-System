import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkWorkstationComponent } from './mark-workstation.component';

describe('MarkWorkstationComponent', () => {
  let component: MarkWorkstationComponent;
  let fixture: ComponentFixture<MarkWorkstationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkWorkstationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkWorkstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
