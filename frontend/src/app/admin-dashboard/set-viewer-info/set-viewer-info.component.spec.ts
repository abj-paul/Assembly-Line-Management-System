import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetViewerInfoComponent } from './set-viewer-info.component';

describe('SetViewerInfoComponent', () => {
  let component: SetViewerInfoComponent;
  let fixture: ComponentFixture<SetViewerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetViewerInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetViewerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
