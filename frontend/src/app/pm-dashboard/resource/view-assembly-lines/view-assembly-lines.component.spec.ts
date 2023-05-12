import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssemblyLinesComponent } from './view-assembly-lines.component';

describe('ViewAssemblyLinesComponent', () => {
  let component: ViewAssemblyLinesComponent;
  let fixture: ComponentFixture<ViewAssemblyLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssemblyLinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssemblyLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
