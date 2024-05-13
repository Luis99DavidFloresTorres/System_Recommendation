import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarUComponent } from './mostrar-u.component';

describe('MostrarUComponent', () => {
  let component: MostrarUComponent;
  let fixture: ComponentFixture<MostrarUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarUComponent]
    });
    fixture = TestBed.createComponent(MostrarUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
