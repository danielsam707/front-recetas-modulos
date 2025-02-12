import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaDosComponent } from './receta-dos.component';

describe('RecetaDosComponent', () => {
  let component: RecetaDosComponent;
  let fixture: ComponentFixture<RecetaDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecetaDosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetaDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
