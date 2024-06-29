import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarExcelComponent } from './ingresar-excel.component';

describe('IngresarExcelComponent', () => {
  let component: IngresarExcelComponent;
  let fixture: ComponentFixture<IngresarExcelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresarExcelComponent]
    });
    fixture = TestBed.createComponent(IngresarExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
