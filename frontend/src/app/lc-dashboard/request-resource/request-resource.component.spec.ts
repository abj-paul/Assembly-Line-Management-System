import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResourceComponent } from './request-resource.component';

describe('RequestResourceComponent', () => {
  let component: RequestResourceComponent;
  let fixture: ComponentFixture<RequestResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestResourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
