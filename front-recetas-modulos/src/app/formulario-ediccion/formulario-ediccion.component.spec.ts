import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEdiccionComponent } from './formulario-ediccion.component';

describe('FormularioEdiccionComponent', () => {
  let component: FormularioEdiccionComponent;
  let fixture: ComponentFixture<FormularioEdiccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioEdiccionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEdiccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
