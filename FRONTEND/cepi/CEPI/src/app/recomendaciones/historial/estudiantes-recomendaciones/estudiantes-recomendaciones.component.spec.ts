import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesRecomendacionesComponent } from './estudiantes-recomendaciones.component';

describe('EstudiantesRecomendacionesComponent', () => {
  let component: EstudiantesRecomendacionesComponent;
  let fixture: ComponentFixture<EstudiantesRecomendacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstudiantesRecomendacionesComponent]
    });
    fixture = TestBed.createComponent(EstudiantesRecomendacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
