import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionStatusComponent } from './production-status.component';

describe('ProductionComponent', () => {
  let component: ProductionStatusComponent;
  let fixture: ComponentFixture<ProductionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
