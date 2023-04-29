import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAreaComponent } from './test-area.component';

describe('TestAreaComponent', () => {
  let component: TestAreaComponent;
  let fixture: ComponentFixture<TestAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
