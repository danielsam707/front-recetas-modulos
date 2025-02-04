import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDosComponent } from './detalle-dos.component';

describe('DetalleDosComponent', () => {
  let component: DetalleDosComponent;
  let fixture: ComponentFixture<DetalleDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleDosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
