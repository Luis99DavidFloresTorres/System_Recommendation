import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitulosDialogComponent } from './titulos-dialog.component';

describe('TitulosDialogComponent', () => {
  let component: TitulosDialogComponent;
  let fixture: ComponentFixture<TitulosDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitulosDialogComponent]
    });
    fixture = TestBed.createComponent(TitulosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
