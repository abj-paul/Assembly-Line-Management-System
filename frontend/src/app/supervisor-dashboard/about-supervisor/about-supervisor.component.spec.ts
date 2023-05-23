import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSupervisorComponent } from './about-supervisor.component';

describe('AboutSupervisorComponent', () => {
  let component: AboutSupervisorComponent;
  let fixture: ComponentFixture<AboutSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutSupervisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
