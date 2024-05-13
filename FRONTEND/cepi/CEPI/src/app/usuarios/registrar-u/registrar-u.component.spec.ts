import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUComponent } from './registrar-u.component';

describe('RegistrarUComponent', () => {
  let component: RegistrarUComponent;
  let fixture: ComponentFixture<RegistrarUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarUComponent]
    });
    fixture = TestBed.createComponent(RegistrarUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
