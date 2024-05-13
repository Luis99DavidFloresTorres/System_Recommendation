import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendarComponent } from './recomendar.component';

describe('RecomendarComponent', () => {
  let component: RecomendarComponent;
  let fixture: ComponentFixture<RecomendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecomendarComponent]
    });
    fixture = TestBed.createComponent(RecomendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
