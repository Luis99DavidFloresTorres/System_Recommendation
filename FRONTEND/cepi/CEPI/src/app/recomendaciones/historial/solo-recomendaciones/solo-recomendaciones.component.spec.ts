import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloRecomendacionesComponent } from './solo-recomendaciones.component';

describe('SoloRecomendacionesComponent', () => {
  let component: SoloRecomendacionesComponent;
  let fixture: ComponentFixture<SoloRecomendacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoloRecomendacionesComponent]
    });
    fixture = TestBed.createComponent(SoloRecomendacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
