import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLineLayoutComponent } from './set-line-layout.component';

describe('TestAreaComponent', () => {
  let component: SetLineLayoutComponent;
  let fixture: ComponentFixture<SetLineLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetLineLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetLineLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
