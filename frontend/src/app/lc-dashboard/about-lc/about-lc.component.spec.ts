import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutLcComponent } from './about-lc.component';

describe('AboutLcComponent', () => {
  let component: AboutLcComponent;
  let fixture: ComponentFixture<AboutLcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutLcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutLcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
